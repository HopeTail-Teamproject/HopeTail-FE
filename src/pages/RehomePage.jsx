import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RehomeForm from "../components/RehomeForm";
import { LanguageProvider } from "../language/LanguageContext";
import "./RehomePage.css"; 

const RehomePage = () => {
  return (
    <LanguageProvider>
      <div className="page-container">
        <Navbar />
        <div className="rehome-wrapper">
          <h1 className="rehome-title">Rehome</h1>
          <RehomeForm />
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default RehomePage;
