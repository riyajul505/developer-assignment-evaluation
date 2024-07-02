import React, { useContext, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

// @material-tailwind/react
import { Typography } from "@material-tailwind/react";

import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CreateAssignment = () => {
  const axiosSecure = useAxiosSecure();
  const [level, setLevel] = useState("easy");

  const { user } = useContext(AuthContext);

  const handleLevel = (lev) => {
    setLevel(lev);
  };

  const handleAddSpot = (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    const url = e.target.url.value;

    const marks = e.target.marks.value;

    const description = e.target.description.value;

    const dueDate = e.target.date.value;

    const userEmail = user.email;

    const assignment = {
      title,
      url,
      dueDate,
      description,
      marks,
      level,
      userEmail,
    };

   e.target.reset();
    axiosSecure.post("/create-assignment", assignment).then((data) => {
      if (data.data.insertedId) {
        Swal.fire("Assignment Added");
        
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleAddSpot}>
        <section className="px-8 py-20 container mx-auto">
          <Typography variant="h5" color="blue-gray">
            Information About The Assignment
          </Typography>
          <Typography
            variant="small"
            className="text-gray-600 font-normal mt-1"
          >
            Add your Assignment information below.
          </Typography>
          <div className="flex flex-col mt-8">
            <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Assignment Title
                </Typography>
                <input
                  type="text"
                  name="title"
                  placeholder="Assignment Title"
                  className="input input-lg input-bordered w-full max-w-xs"
                />
              </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Image Url
                </Typography>
                <input
                  type="text"
                  name="url"
                  placeholder="Image Url"
                  className="input input-lg input-bordered w-full max-w-xs"
                />
              </div>
            </div>
          </div>
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Description
              </Typography>
              <input
                type="text"
                name="description"
                placeholder="Description"
                className="input input-lg input-bordered w-full max-w-xs"
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Marks
              </Typography>
              <input
                type="number"
                name="marks"
                placeholder="Assignment Mark"
                className="input input-lg input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                <div className="dropdown dropdown-hover">
                  <div tabIndex={0} role="button" className="btn m-1">
                    Difficulty Level
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li onClick={() => handleLevel("Easy")}>
                      <a>Easy</a>
                    </li>
                    <li onClick={() => handleLevel("Medium")}>
                      <a>Medium</a>
                    </li>
                    <li onClick={() => handleLevel("Hard")}>
                      <a>Hard</a>
                    </li>
                  </ul>
                </div>
              </Typography>
              {/* <input type="text" name="" placeholder="" className="input input-lg input-bordered w-full max-w-xs" /> */}
            </div>
          </div>
          <div className="flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Due Date
              </Typography>
              <input
                type="date"
                name="date"
                placeholder="Assignment Due Date"
                className="input input-lg input-bordered w-full max-w-xs"
              />
            </div>
          </div>

          <div className="flex justify-center items-center mt-3">
            <button className="btn btn-wide btn-success ">Add</button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default CreateAssignment;
