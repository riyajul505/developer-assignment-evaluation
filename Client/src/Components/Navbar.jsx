import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { AuthContext } from "../Context/AuthProvider";

const Navbar = () => {
  const nav = (
    <>
      <li>Assignments</li>
      <li>Create Assignment</li>
      <li>Pending Assignments</li>
      <li>Assignments</li>
    </>
  );
  const { user, loading, logOut, setLoading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
      // <div className="flex justify-center items-center w-full h-full">
      //   <span className="loading loading-spinner loading-lg"></span>
      // </div>
    );
  }
  const handleSignOut = () => {
    logOut()
      .then(() => {
        // setLoading(false);
      })
      .catch();
  };
  return (
    <div className="navbar bg-base-100 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn p-0 btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
            <NavLink to="/assignments">Assignments</NavLink>
          </li>
          {user && (
            <li>
              {user && (
                <NavLink to="/create-assignment">Create Assignment</NavLink>
              )}
            </li>
          )}

          {user && (
            <li>
              <NavLink to="/pending-assignment">Pending Assignments</NavLink>
            </li>
          )}
          
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-base lg:text-xl">
          DevAssign
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/assignments">Assignments</NavLink>
          </li>
          {user && (
            <li>
              {user && (
                <NavLink to="/create-assignment">Create Assignment</NavLink>
              )}
            </li>
          )}

          {user && (
            <li>
              <NavLink to="/pending-assignment">Pending Assignments</NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink to="/discussion-forum">Discussion Forum</NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className="dropdown dropdown-left dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1">
                <div className="avatar online">
                  <div className="w-8 lg:w-10 rounded-full">
                    <img src={`${user.photoURL}`} />
                  </div>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[300] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li className="z-[400]">
                    <Link to={'/my-submission'}>My Submission</Link>
                  </li>
                  <li className="z-[400]">
                    <Link onClick={handleSignOut}>Log out</Link>
                    {/* <button
                      onClick={handleSignOut}
                      className="btn text-[12px] lg:text-base btn-warning ml-2 w-[55%] lg:w-auto"
                    >
                      Log Out
                    </button> */}
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="flex gap-3">
            <Link to="/login">
              <button className="btn btn-success">log in</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-success">Register</button>
            </Link>
          </div>
        )}
      </div>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default Navbar;
