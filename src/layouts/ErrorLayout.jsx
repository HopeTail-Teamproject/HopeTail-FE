import React from "react";
import Navbar from "../components/common/navbar/Navbar";
import Footer from "../components/common/footer/Footer";
import "./errorLayout.css";

const ErrorLayout = ({ children }) => {
  return (
    <div className="error-layout">
      <Navbar />
      <main className="error-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default ErrorLayout;
