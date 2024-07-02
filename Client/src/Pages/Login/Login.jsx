import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/AuthProvider";

const Login = () => {
  const { logIn, googlePopUp, gitHubLogIn, setLoading } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);

  const handleGitHubLogin = (e) => {
    e.preventDefault();
    gitHubLogIn()
      .then(() => console.log("git logged in"))
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    e.stopPropagation();

    logIn(email, password)
      .then(() => {
        toast.success("logged in");
        navigate('/');
        // e.target.reset();

        // navigate(location?.state ? location.state : "/");
        
      })
      .catch((error) => {
        toast.warning(`${error.message}`);
        setLoading(false);
      });
  };
  const handlegooglePopUp = (e) => {
    e.preventDefault();
    googlePopUp()
      .then((result) => {
        toast.success("Logged in");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  return (
    <div>
      <Helmet>
        <title>Login | DevAssign</title>
      </Helmet>
      <div className="hero ">
        <div className="w-auto md:hero-content lg:hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <Link to={"/register"}>New to this website? Register</Link>
                </label>
                <div className="flex justify-center items-center gap-7">
                  <button className="text-2xl" onClick={handlegooglePopUp}>
                    <FaGoogle />
                  </button>
                  <button className="text-2xl" onClick={handleGitHubLogin}>
                    <FaGithub />
                  </button>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
