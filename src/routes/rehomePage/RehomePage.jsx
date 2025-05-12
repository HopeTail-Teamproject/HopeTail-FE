import React from "react";
import RehomeForm from "../../components/RehomeForm";
import { useLanguage } from "../../context/language/LanguageContext";
import "./RehomePage.css"; 

const RehomePage = () => {
  const { language } = useLanguage(); 

  return (
    <div className="page-container">
      <div className="rehome-wrapper">
        <h1 className="rehome-title">Rehome</h1>
        <RehomeForm />
      </div>
    </div>
  );
};

export default RehomePage;
