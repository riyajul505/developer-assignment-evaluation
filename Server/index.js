const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

// middleware

app.use(
  cors({
    origin: ["http://localhost:5173", "https://ph-a11.surge.sh", "https://ph-a10.firebaseapp.com"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ixzkh9v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  // console.log('verify tokens', token);
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    // console.log(req.user, 'reqqq')
    next();
  });
  
};

const cookieOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
}

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const assignmentCollection = client.db("PHA11").collection("assignments");
    const pendingCollection = client.db("PHA11").collection("pending");
    const forumCollection = client.db("PHA11").collection("forum");


    app.post("/generate-token", async (req, res) => {
      const user = req.body;
      // console.log(user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res
        .cookie("token", token, cookieOption)
        .send({ message: true });
    });

    app.post("/logout", async (req, res) => {
      // console.log(req.body);
      res.clearCookie("token", {...cookieOption, maxAge: 0 }).send({ logOut: true });
    });

    app.post("/create-assignment", async (req, res) => {
      const data = req.body;
      
      const result = await assignmentCollection.insertOne(data);
      res.send(result);
    });

    app.post('/add-take-assignment', async(req, res)=>{
      const data = req.body;
      const result = await pendingCollection.insertOne(data);
      res.send(result);
    })

    app.get("/my-submission/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      // console.log('my cookie', req.cookies);
      // console.log('token owner info', req.user.email, 'called', email);

      if(req.user.email !== email){
        return res.status(403).send({message:'forbidden access'})
      }

      const result = pendingCollection.find({ user: email });
      const lol = await result.toArray();
      res.send(lol);
      
    });

    // app.get("/selectedCountry/:name", async (req, res) => {
    //   const country = req.params.name;
    //   // console.log(country);
    //   const result = spotCollection.find({ country: country });
    //   const lol = await result.toArray();
    //   res.send(lol);
    // });

    app.get("/assignments", async (req, res) => {
      // console.log("tok tok", req.cookies.token);
      // console.log(req.user, 'from valid user');
      const result = assignmentCollection.find();
      const data = await result.toArray();

      res.send(data);
    });
    app.get("/filter-assignments/:level", async (req, res) => {
      // console.log("tok tok", req.cookies.token);
      // console.log(req.user, 'from valid user');

      const result = assignmentCollection.find({level:req.params.level});
      const data = await result.toArray();

      res.send(data);
    });

    app.get("/youchoose/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await assignmentCollection.findOne(query);
      // console.log(result);
      res.send(result);
    });
    app.get("/pending-data/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await pendingCollection.findOne(query);
      // console.log(result);
      res.send(result);
    });

    app.get("/pending-assignment", async (req, res) => {
      const result = pendingCollection.find({obtain:'pending'});
      const data = await result.toArray();
      res.send(data);
    });

    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await assignmentCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/update/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          title: data.title,
          url: data.url,
          dueDate: data.dueDate,
          description: data.description,
          marks: data.marks,
          level: data.level,
          
        },
      };
      const result = await assignmentCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    
    app.put("/update-pending/:id", async (req, res) => {
      // console.log('hitted')
      const id = req.params.id;
      
      const data = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          obtain: data.obtain,
          status: data.status,
          feedback: data.feedback,
          
        },
      };
      const result = await pendingCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Forums api
    app.post('/submit-forum', async(req, res)=>{
      const data = req.body;
      const result = await forumCollection.insertOne(data);
      res.send(result);
    })

    app.get('/get-forums', async (req, res)=>{
      const result = await forumCollection.find().toArray();
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("A11 server TEST 1");
});

app.listen(port, () => {
  console.log("A11 server is running");
});
