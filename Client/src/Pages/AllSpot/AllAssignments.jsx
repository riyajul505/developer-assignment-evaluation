import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Card from "./Card";

const AllAssignments = () => {
  const [dataLoading, setDataLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [assignments, setAssignments] = useState([]);
  const handleFilter = (level) => {
    if (level == "All") {
      axiosSecure.get("/assignments").then((data) => setAssignments(data.data));
    } else {
      axiosSecure
        .get(`/filter-assignments/${level}`)
        .then((data) => setAssignments(data.data));
    }
  };
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete/${_id}`).then((data) => {
          if (data.data.deletedCount > 0) {
            Swal.fire("Deleted Successfully");
            axiosSecure
              .get("/assignments")
              .then((data) => setAssignments(data.data));
          }
        });
      }
    });
  };
  useEffect(() => {
    axiosSecure.get("/assignments").then((data) => {setAssignments(data.data);setDataLoading(false)});
  }, []);
  
  if(dataLoading){
    return <div className="flex justify-center items-center mt-10"><span className="loading loading-spinner loading-lg"></span></div>
  }


  return (
    <>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">
          Filter
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li onClick={() => handleFilter("All")}>
            <a>All</a>
          </li>
          <li onClick={() => handleFilter("Easy")}>
            <a>Esay</a>
          </li>
          <li onClick={() => handleFilter("Medium")}>
            <a>Medium</a>
          </li>
          <li onClick={() => handleFilter("Hard")}>
            <a>Hard</a>
          </li>
        </ul>
      </div>
      <div className="mt-7 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {assignments.map((i, idx) => (
          <Card key={idx} handleDelete={handleDelete} data={i}></Card>
        ))}
      </div>
    </>
  );
};

export default AllAssignments;
