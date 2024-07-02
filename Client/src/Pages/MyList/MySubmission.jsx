import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyList = () => {
  const { user, loading } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const [myList, setMyList] = useState([]);

  const [feedback, setFeedback] = useState([]);

  const handleShowFeedback = _id =>{
    axiosSecure.get(`/pending-data/${_id}`).then((data) => {
      setFeedback(data.data);
    });
  }

  useEffect(() => {
    axiosSecure
      .get(`/my-submission/${user.email}`)
      .then((data) => setMyList(data.data));
  }, []);

  return (
    <div>
      <div className="overflow-x-auto table-md">
        <table className="table table-md">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Assignment</th>
              <th>Marks</th>
              <th>Obtain Marks</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {/* <tr className="bg-base-200">
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr> */}
            {myList.map((i, idx) => (
              <tr key={idx} className="bg-base-200">
                <th>{idx + 1}</th>
                <td>{i.title}</td>
                <td>{i.marks}</td>
                <td>{i.obtain}</td>
                <td className="gap-2">
                  <button
                    className="btn"
                    onClick={() =>
                      {document.getElementById("my_modal_5").showModal();
                        handleShowFeedback(i._id)
                      }
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          
        </table>
        <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Users Feedback</h3>
              <p className="py-4">{feedback?.feedback ? feedback.feedback: 'Pending Feedback' }</p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
      </div>
    </div>
  );
};

export default MyList;
