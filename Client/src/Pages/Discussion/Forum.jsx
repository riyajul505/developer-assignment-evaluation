import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useForum from "../../Hooks/useForum";

const Forum = () => {
  const { user } = useContext(AuthContext);
  const [data, refetch] = useForum();
  const axiosSecure = useAxiosSecure();
  const handleForumQuestion = (e) => {
    e.preventDefault();
    const queries = {
      question: e.target.question.value,
      answer: "N/A",
      question_Asked_by: user.displayName,
    };

    axiosSecure.post("/submit-forum", queries).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire("Queries Added");
        refetch();
        e.reset();
      }
    });
  };
  return (
    <div>
      <h1 className="text-4xl w-full text-center">
        Have A Question? Ask here...
      </h1>
      <div className="flex justify-center items-center mt-10">
        <form onSubmit={handleForumQuestion} className="space-y-5">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Write Your Query...</span>
            </div>
            <textarea
              name="question"
              className="textarea textarea-bordered textarea-lg h-24"
              placeholder="here...."
            ></textarea>
          </label>
          <button className="btn btn-secondary">Submit</button>
        </form>
      </div>
      <div className="mt-10">
        <h1 className="text-xl font-body text-blue-600">
          Here you will find every queries.
        </h1>
        <div>
          <div className="join join-vertical w-full">
            {data &&  data.map((queries) => (
              <div
                key={queries._id}
                className="collapse collapse-arrow join-item border border-base-300"
              >
                <input type="radio" name="my-accordion-4" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                  <p className="text-base my-2 text-blue-300">
                    Asked by: {queries.question_Asked_by}
                  </p>
                  {queries.question}
                </div>
                <div className="collapse-content">
                  <p>{queries.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
