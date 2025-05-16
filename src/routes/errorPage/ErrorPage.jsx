import React from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-wrapper">
      <main className="error-container">
        <div className="error-content">
          <h1 className="error-title">404 Error - Page Not Found</h1>
          <div className="dog-illustration">
            <img src="/images/dog_walk.png" alt="Dog illustration" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
