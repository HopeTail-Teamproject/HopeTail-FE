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

function MainAdoptPage({ adoptionId, onImageUpload, onAnswersSubmit, onFinalSubmit }) {
  const { language } = useLanguage();

  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;

  // 각 단계별 데이터 상태 관리
  const [formData, setFormData] = useState({
    images: [],
    form2Answers: {},
    form22Answers: {},
    form3Answers: {},
  });

  // 각 단계별 필수 입력 상태
  const [stepValidation, setStepValidation] = useState({
    0: false, // 이미지 업로드
    1: false, // Form2
    2: false, // Form22
    3: false, // Form3
  });

  const handleImageSubmit = (imageUrls) => {
    setFormData((prev) => ({
      ...prev,
      images: imageUrls,
    }));
    setStepValidation((prev) => ({
      ...prev,
      0: imageUrls.length >= 2,
    }));

    // 로컬 상태만 업데이트
    onImageUpload(imageUrls);
  };

  const handleForm2Submit = (answers) => {
    setFormData((prev) => ({
      ...prev,
      form2Answers: answers,
    }));
    setStepValidation((prev) => ({
      ...prev,
      1: true,
    }));

    // 로컬 상태만 업데이트
    onAnswersSubmit(answers, "form2Answers");
  };

  const handleForm22Submit = (answers) => {
    setFormData((prev) => ({
      ...prev,
      form22Answers: answers,
    }));
    setStepValidation((prev) => ({
      ...prev,
      2: true,
    }));

    // 로컬 상태만 업데이트
    onAnswersSubmit(answers, "form22Answers");
  };

  const handleForm3Submit = (answers) => {
    setFormData((prev) => ({
      ...prev,
      form3Answers: answers,
    }));
    setStepValidation((prev) => ({
      ...prev,
      3: true,
    }));

    // 로컬 상태만 업데이트
    onAnswersSubmit(answers, "form3Answers");
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

    // 현재 단계의 유효성 검사
    if (!stepValidation[currentStep]) {
      alert(
        language === "kr"
          ? "모든 필수 항목을 입력해주세요."
          : "Please fill in all required fields."
      );
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 모든 단계가 완료되었는지 확인
    const allStepsCompleted = Object.values(stepValidation).every((valid) => valid);
    if (!allStepsCompleted) {
      alert(
        language === "kr"
          ? "모든 필수 항목을 입력해주세요."
          : "Please fill in all required fields."
      );
      return;
    }

    await onFinalSubmit();
  };

  return (
    <section className="adopt">
      <div className="adopt-title">
        <span>{language === "kr" ? "입양하기" : "Adopt"}</span>
      </div>
      <StepBar currentStep={getCurrentStep()} stepValidation={stepValidation} />
      <div className="adopt-main">
        <Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
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
                <AdoptForm2 onAnswersSubmit={handleForm2Submit} />
              </div>
              <div className="adopt-step">
                <AdoptForm22 onAnswersSubmit={handleForm22Submit} />
              </div>
              <div className="adopt-step">
                <AdoptForm3 onAnswersSubmit={handleForm3Submit} />
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
