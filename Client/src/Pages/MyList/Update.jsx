import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Update = () => {
  const axiosSecure = useAxiosSecure();
  const data = useLoaderData();
  const [level, setLevel] = useState("easy");
  const handleLevel = (lev) => {
    setLevel(lev);
  };
  const { _id, title, url, dueDate, description, marks } = data;

  const handleUpdateAssignment = (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    const url = e.target.url.value;

    const marks = e.target.marks.value;

    const description = e.target.description.value;

    const dueDate = e.target.date.value;

    const assignment = {
      title,
      url,
      dueDate,
      description,
      marks,
      level,
    };
    axiosSecure.put(`/update/${_id}`, assignment)
    .then((data) => {
      if(data.data.modifiedCount){
        Swal.fire('Updated Successfully')
      }
      else{
        Swal.fire('error happened')
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleUpdateAssignment}>
        <section className="px-8 py-20 container mx-auto">
          <Typography variant="h5" color="blue-gray">
            Update Spot Information
          </Typography>
          <Typography
            variant="small"
            className="text-gray-600 font-normal mt-1"
          >
            Add your Tourist information below.
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
                  defaultValue={title}
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
                  defaultValue={url}
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
                defaultValue={description}
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
                defaultValue={marks}
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
                defaultValue={dueDate}
                name="date"
                placeholder="Assignment Due Date"
                className="input input-lg input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="flex justify-center items-center mt-3">
            <button className="btn btn-wide btn-success ">Update</button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Update;
