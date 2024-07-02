import { useContext } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ViewDetails = () => {
  const axiosSecure = useAxiosSecure();
  const [submitDone, setSubmitDone] = useState(false);
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  const handle = () =>{
    console.log("closeeeeee");
  }
  const handleTakeAssignment = (e) => {
    e.preventDefault();
    const link = e.target.link.value;
    const textarea = e.target.textarea.value;
    const email = user.email;
    const newData = {
      title: data.title,
      url: data.url,
      dueDate: data.dueDate,
      description: data.description,
      marks: data.marks,
      level: data.level,
      link: link,
      notes: textarea,
      status: "pending",
      user: email,
      obtain: "pending",
    };
    axiosSecure.post("/add-take-assignment", newData).then((data) => {
      if (data.data.insertedId) {
        // Swal.fire("Submission Done");
        toast('Submission Done');
        setSubmitDone(true);
      }
    });
    e.target.reset();
  };

  return (
    <div>
      <Helmet>
        <title>{`DevAssign | ${data.title}`}</title>
      </Helmet>
      <div className="lg:flex lg:justify-between space-y-2">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <p className="text-2xl font-bold">Marks:{data.marks}</p>
      </div>
      <h2 className="bg-base-300 w-auto text-center mt-3">
        Due Date: {data.dueDate}
      </h2>
      <p className="flex gap-3 items-center mt-2 font-semibold text-2xl">
        {data.description}
      </p>
      <div className="w-full mt-2">
        <img src={data.url} alt="" className="h-auto w-auto" />
      </div>
      <p className="text-left font-medium text-xl"></p>
      <h2 className="text-xl mt-3 flex gap-2 items-center font-bold">
        Difficulty Level: {data.level}
      </h2>
      <button
        className="btn btn-secondary mt-3"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Take Assignment
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Provide your assignment links</h3>
          <form onSubmit={handleTakeAssignment}>
            <p className="py-4">
              <label className="input input-bordered flex items-center gap-2">
                PDF/Doc Link
                <input
                  type="text"
                  name="link"
                  className="grow"
                  placeholder="Pase here"
                />
              </label>
              <textarea
                className="textarea textarea-accent mt-4"
                placeholder="Write your notes"
                name="textarea"
              ></textarea>
            </p>
            {/* <span>{submitDone && 'Submit Done'}</span> */}
            <button className="btn btn-primary">submit</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* <button>Close</button> */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <ToastContainer />
    </div>
  );
};

export default ViewDetails;
