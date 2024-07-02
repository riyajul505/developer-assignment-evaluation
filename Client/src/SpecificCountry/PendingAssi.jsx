import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Card from "./Card";

const PendingAssi = () => {
  const axiosSecure = useAxiosSecure();
  const [loadingData, setLoadingData] = useState(true);
  const [ass, setAss] = useState([]);
  const [data, setData] = useState([]);
  const handleDataFetch = (_id) => {
    axiosSecure.get(`/pending-data/${_id}`).then((data) => {
      setAss(data.data);
    });
  };
  
  const reFetch = () =>{
    axiosSecure('/pending-assignment')
    .then(data=> {setData(data.data);setLoadingData(false)})
  }

  useEffect(()=>{
    axiosSecure('/pending-assignment')
    .then(data=> {setData(data.data);setLoadingData(false)})
  },[])

  if(loadingData){
    return <div className="flex justify-center items-center mt-10"><span className="loading loading-spinner loading-lg"></span></div>
  }

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((i, idx) => (
        <Card key={idx} reFetch={reFetch} ass={ass} handleDataFetch={handleDataFetch} data={i}></Card>
      ))}
    </div>
  );
};

export default PendingAssi;
