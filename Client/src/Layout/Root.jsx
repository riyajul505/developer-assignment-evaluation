import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Root = () => {
  return (
    <div>
      <div className="container mx-auto p-2">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
