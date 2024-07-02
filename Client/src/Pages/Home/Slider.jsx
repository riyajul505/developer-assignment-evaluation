import { NavLink } from "react-router-dom";

const Slider = () => {
  return (
    <div>
      <div className="hero rounded-3xl min-h-screen bg-base-200">
        <div className="hero-content lg:w-1/2 rounded-3xl flex-col lg:flex-row-reverse">
          <img
            src="https://plus.unsplash.com/premium_photo-1675419532425-e6b52fe24dc5?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-auto rounded-lg shadow-2xl"
          />
          <div className=" ">
            <h1 className="text-5xl font-bold">
              Create and Evaluate Assignment
            </h1>
            <p className="py-6">
            Enhance your learning with our collaborative platform. Easily create assignments, work with friends, and evaluate each other's work. Join us to make learning interactive and efficient. Start creating and evaluating assignments today!
            </p>
            <NavLink to={"/assignments"} className="btn btn-secondary">
              Get Assignments
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
