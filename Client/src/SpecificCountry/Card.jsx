import Iframe from "react-iframe";
import { toast } from "react-toastify";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Card = ({ data, handleDataFetch, ass, reFetch }) => {
  const axiosSecure = useAxiosSecure();

  const { _id, url, title, dueDate, description, marks, level, user } = data;

  const handleGiveMark = (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;
    const obtain = e.target.mark.value;
    const status = "completed";
    const update = { feedback, obtain, status };
    // console.log(update);
    axiosSecure.put(`/update-pending/${ass._id}`, update).then((data) => {if(data.data.modifiedCount > 0){
      reFetch();
      toast('Submitted');
    }});

    e.target.reset();
  };

  return (
    <div>
      <div className="card w-auto bg-base-100 shadow-xl">
        <figure className="h-[250px]">
          <img src={url} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>Marks: {marks}</p>
          <p>Examine: {user}</p>
          <p>Deadline: {dueDate}</p>
        </div>
        <button
          className="btn"
          onClick={() => {
            document.getElementById("my_modal_5").showModal();
            handleDataFetch(_id);
          }}
        >
          Give Mark
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <span className="font-bold text-lg">Link: {ass.link}</span>
            <p className="py-4">Notes: {ass.notes}</p>
            <Iframe
              url={ass.link}
              width="400px"
              height="320px"
              className="border border-black"
              display="block"
              position="relative"
            />
            <form onSubmit={handleGiveMark}>
              <label className="input input-bordered flex items-center gap-2">
                Give Mark
                <input
                  type="number"
                  name="mark"
                  className="grow"
                  placeholder="type here"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Give Feedback
                <input
                  type="text"
                  name="feedback"
                  className="grow"
                  placeholder="write here.."
                />
              </label>
              <button className="btn btn-primary">Submit</button>
            </form>
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

export default Card;
