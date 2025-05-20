import React from "react";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-page-wrapper">
      <div className="error-main">
        <h1>404 Error - Page Not Found</h1>
      </div>
      <img src="/HopeTail-FE/images/dog_walk.png" alt="dog" className="error-dog" />
    </div>
  );
};

export default ErrorPage;