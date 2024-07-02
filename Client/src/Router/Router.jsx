import { createBrowserRouter } from "react-router-dom";
import Error from "../Components/Error";
import PrivateRoute from "../Components/PrivateRoute";
import Root from "../Layout/Root";
import CreateAssignment from "../Pages/AddTouristSpot/CreateAssignment";
import AllAssignments from "../Pages/AllSpot/AllAssignments";
import ViewDetails from "../Pages/AllSpot/ViewDetails";
import Forum from "../Pages/Discussion/Forum";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MySubmission from "../Pages/MyList/MySubmission";
import Update from "../Pages/MyList/Update";
import Register from "../Pages/Register/Register";
import PendingAssi from "../SpecificCountry/PendingAssi";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/assignments",
        element: <AllAssignments />,
      },
      {
        path: '/my-submission',
        element: <PrivateRoute><MySubmission/></PrivateRoute>
      },

      {
        path: "/create-assignment",
        element: (
          <PrivateRoute>
            <CreateAssignment />
          </PrivateRoute>
        ),
        
      },
      {
        path: '/discussion-forum',
        element: <PrivateRoute><Forum/></PrivateRoute>,
      },
      {
        path: "/pending-assignment",
        element: (
          <PrivateRoute>
            <PendingAssi/>
          </PrivateRoute>
        ),
      },
     
      {
        path: "/youchoose/:id",
        element: (
          <PrivateRoute>
            <ViewDetails />
          </PrivateRoute>
        ),
        loader: ({params})=> fetch(`https://pha10.vercel.app/youchoose/${params.id}`)
      },
      {
        path: "/update/:id",
        element: <PrivateRoute><Update /></PrivateRoute>,
        loader: ({params})=> fetch(`https://pha10.vercel.app/youchoose/${params.id}`)
      },
      
    ],
  },
]);

export default router;
