import React from "react";
import Navbar from "../../components/common/navbar/Navbar";
import Footer from "../../components/common/footer/Footer";
import RehomeForm from "../../components/RehomeForm";
import { useLanguage } from "../../context/language/LanguageContext";
import "./RehomePage.css"; 

const RehomePage = () => {
  const { language } = useLanguage(); 

  return (
    <div className="page-container">
      <Navbar />
      <div className="rehome-wrapper">
        <h1 className="rehome-title">Rehome</h1>
        <RehomeForm />
      </div>
      <Footer />
    </div>
  );
};

export default RehomePage;
