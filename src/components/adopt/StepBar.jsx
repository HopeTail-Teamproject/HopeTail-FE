import React from "react";
import "./stepBar.css";
import { useLanguage } from "../../context/language/LanguageContext";
import { adoptStep } from "../../lib/adopt";

function StepBar({ currentStep, stepValidation }) {
  const { language } = useLanguage();
  const t = adoptStep[language];

  return (
    <div className="step-bar">
      {t.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isValid = stepValidation[index];

        return (
          <div className="step-wrapper" key={index}>
            <div className="step-item">
              <div
                className={`step-circle ${
                  isCompleted ? "completed" : isActive ? "active" : ""
                } ${!isValid && isActive ? "invalid" : ""}`}
              >
                {isCompleted ? "✓" : !isValid && isActive ? "✕" : index + 1}
              </div>
              <div
                className={`step-label ${isCompleted || isActive ? "active" : ""} ${
                  !isValid && isActive ? "invalid" : ""
                }`}
              >
                {label}
              </div>
            </div>
            {index < t.length - 1 && (
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
