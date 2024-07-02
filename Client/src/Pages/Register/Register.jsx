import { updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/AuthProvider";
import auth from "../../Firebase/Firebase.config";

const Register = () => {
  const {user, createUser, setLoading, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleShowPassword = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const url = e.target.url.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    console.log(name, url);
    if (passwordRegex.test(password)) {
      // console.log("password is ok");
    } else {
      return toast.warning(
        <p>
          Password Must have <br />● An Uppercase letter <br /> ● A Lowercase
          letter <br /> ● Length at least 6 character
        </p>
      );
    }
    createUser(email, password)
      .then((result) => {
        
        // console.log(result.user, 'this is user');
        // setUser(result.user);
        
        updateProfile(auth.currentUser, { displayName: name, photoURL: url })
          .then(() => toast.warning('Reload the page to see profile photo and name'))
          .catch((error) => console.error(error));
        // navigate('/');
        // setLoading(false);
        toast.success("Registred successfully");
        e.target.reset();
        // navigate('/');
      })
      .catch((error) => {
        toast.warning(`${error.message}`);
        e.target.reset();
        setLoading(false);
      });
  };
  return (
    <div>
      <Helmet>
        <title>Register | DevAssign</title>
      </Helmet>
      <div className="hero w-[90%]">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleRegister}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="url"
                  placeholder="Your Photo URL"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />

                {showPassword ? (
                  <button
                    className="absolute top-[54px] right-2"
                    onClick={handleShowPassword}
                  >
                    <FaEyeSlash />
                  </button>
                ) : (
                  <button
                    className="absolute top-[54px] right-2"
                    onClick={handleShowPassword}
                  >
                    <FaEye />
                  </button>
                )}
              </div>
              <label className="label">
                <Link to={"/login"}>Already have an account? Login</Link>
              </label>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
