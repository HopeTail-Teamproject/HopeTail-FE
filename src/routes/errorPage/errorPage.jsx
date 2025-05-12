import React from 'react';
import './ErrorPage.css';
import dogImg from "../../assets/dog_pic.png";

const ErrorPage = () => {
  return (
    <div className="error-wrapper">
      <main className="error-container">
        <div className="error-content">
          <h1 className="error-title">404 Error - Page Not Found</h1>
          <div className="dog-illustration">
            <img src={dogImg} alt="Dog illustration" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
