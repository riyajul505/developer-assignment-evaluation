import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";


const axiosSecure = axios.create({
  // baseURL: "https://pha10.vercel.app",
  baseURL: "https://pha10.vercel.app",
  withCredentials: true,
});


const useAxiosSecure = () => {
  // const { logOut } = useContext(AuthContext);

  useEffect(() => {
    // const {logOut} = useContext(AuthContext);
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log("error interceptor", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          console.log("logout the use");
          <Navigate to='/login'/>
        }
      }
    );
  }, []);
  return axiosSecure;
};

export default useAxiosSecure;
