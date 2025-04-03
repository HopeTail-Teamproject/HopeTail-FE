import Navbar from "../components/common/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/footer/Footer";
import "./basicLayout.css";

function BasicLayout() {
  return (
    <div className="layout-basic">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default BasicLayout;
