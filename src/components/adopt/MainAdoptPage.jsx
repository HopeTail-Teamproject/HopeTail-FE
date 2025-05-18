import AdoptForm1 from "./step/AdoptForm1";
import "./mainAdoptPage.css";
import StepBar from "./StepBar";
import { Form } from "react-router-dom";
import { useState } from "react";
import AdoptForm2 from "./step/AdoptForm2";
import AdoptForm22 from "./step/AdoptForm22";
import AdoptForm3 from "./step/AdoptForm3";
import FormDone from "./step/FormDone";
import { useLanguage } from "../../context/language/LanguageContext";

function MainAdoptPage({ adoptionId, onImageUpload, onAnswersSubmit }) {
  const { language } = useLanguage();

  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;

  const handleImageSubmit = async (imageUrls) => {
    if (onImageUpload) {
      await onImageUpload(imageUrls);
    }
  };

  const handleAnswersSubmit = async (answers) => {
    if (onAnswersSubmit) {
      await onAnswersSubmit(answers);
    }
  };

  const getCurrentStep = () => {
    if (currentStep === 0) return 0;
    if (currentStep === 1 || currentStep === 2) return 1;
    if (currentStep === 3) return 2;
    if (currentStep === 4) return 3;
    return 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep >= totalSteps - 1) return;

    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section className="adopt">
      <div className="adopt-title">
        <span>{language === "kr" ? "입양하기" : "Adopt"}</span>
      </div>
      <StepBar currentStep={getCurrentStep()} />
      <div className="adopt-main">
        <Form method="post" encType="multipart/form-data">
          <input type="hidden" name="adoptionId" value={adoptionId} />
          <div className="form-slider-wrapper">
            <div
              className="form-slider"
              style={{
                transform: `translateX(-${currentStep * 20}%)`,
              }}
            >
              <div className="adopt-step">
                <AdoptForm1 onImageSubmit={handleImageSubmit} />
              </div>
              <div className="adopt-step">
                <AdoptForm2 onAnswersSubmit={handleAnswersSubmit} />
              </div>
              <div className="adopt-step">
                <AdoptForm22 onAnswersSubmit={handleAnswersSubmit} />
              </div>
              <div className="adopt-step">
                <AdoptForm3 onAnswersSubmit={handleAnswersSubmit} />
              </div>
              <div className="adopt-step">
                <FormDone />
              </div>
            </div>
          </div>
          <div className="button-box">
            <button
              type="button"
              className={currentStep === 0 ? "back back-disabled" : "back"}
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              {language === "kr" ? "이전" : "Back"}
            </button>
            {currentStep === totalSteps - 1 ? (
              <button type="submit" className="continue">
                {language === "kr" ? "제출하기" : "Submit"}
              </button>
            ) : (
              <button type="button" className="continue" onClick={handleNext}>
                {language === "kr" ? "다음" : "Continue"}
              </button>
            )}
          </div>
        </Form>
      </div>
    </section>
  );
}

export default MainAdoptPage;
