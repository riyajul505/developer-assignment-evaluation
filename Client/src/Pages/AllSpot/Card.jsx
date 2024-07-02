import { useContext } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Card = ({ data , handleDelete}) => {

  const {user} = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  

  const { _id, url, title, dueDate, description, marks, level, userEmail } = data;
  return (
    <div>
      <div className="card w-auto bg-base-100 shadow-xl">
        <figure className="h-[200px]">
          <img src={url} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>Marks: {marks}</p>
          <p>Level: {level}</p>
          <p>Best time to submit: {dueDate}</p>
          <div className="card-actions justify-end">
            <Link to={`/youchoose/${_id}`}>
              <button className="btn btn-secondary">View Details</button>
            </Link>
            <Link to={`/update/${_id}`}><button className="btn btn-secondary">Update</button></Link>
            {userEmail == user?.email ? <Link><button onClick={()=>handleDelete(_id)} className="btn btn-primary">Delete</button></Link> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
