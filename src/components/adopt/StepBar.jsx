import React from "react";
import "./stepBar.css";

const steps = ["Images of Home", "Questions", "Other Animals", "Confirm"];

function StepBar({ currentStep }) {
  return (
    <div className="step-bar">
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div className="step-wrapper" key={index}>
            <div className="step-item">
              <div
                className={`step-circle ${
                  isCompleted ? "completed" : isActive ? "active" : ""
                }`}
              >
                {isCompleted ? "✓" : index + 1}
              </div>
              <div className={`step-label ${isCompleted || isActive ? "active" : ""} `}>
                {label}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`step-line-div ${index < currentStep ? "line-completed" : ""}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepBar;
