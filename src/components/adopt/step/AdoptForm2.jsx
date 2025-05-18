import "./adoptForm2.css";
import { useLanguage } from "../../../context/language/LanguageContext";
import { adoptForm2Text } from "../../../lib/adopt";
import { useState } from "react";

function AdoptForm2({ onAnswersSubmit }) {
  const { language } = useLanguage();
  const t = adoptForm2Text[language];
  const [answers, setAnswers] = useState({
    WHY_ADOPT: "",
    FAMILY_MEMBERS: "",
    LIVING_PLACE: "",
    OUTSIDE_FREQUENCY: "",
    BATH_PLAN: "",
  });

  const handleAnswerChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 모든 답변이 입력되었는지 확인
    const newAnswers = { ...answers, [name]: value };
    const allAnswered = Object.values(newAnswers).every((answer) => answer.trim() !== "");

    if (allAnswered) {
      const formattedAnswers = Object.entries(newAnswers).map(
        ([questionType, answer]) => ({
          questionType,
          answer,
        })
      );
      onAnswersSubmit(formattedAnswers);
    }
  };

  return (
    <div className="adopt-form2">
      <div className="form2-main">
        <div className="question-form">
          <span>{t.question1}</span>
          <textarea
            id="WHY_ADOPT"
            name="WHY_ADOPT"
            placeholder="text"
            required
            value={answers.WHY_ADOPT}
            onChange={handleAnswerChange}
          />
        </div>
        <div className="question-form">
          <span>{t.question2}</span>
          <textarea
            id="FAMILY_MEMBERS"
            name="FAMILY_MEMBERS"
            placeholder="text"
            required
            value={answers.FAMILY_MEMBERS}
            onChange={handleAnswerChange}
          />
        </div>
        <div className="question-form">
          <span>{t.question3}</span>
          <textarea
            id="LIVING_PLACE"
            name="LIVING_PLACE"
            placeholder="text"
            required
            value={answers.LIVING_PLACE}
            onChange={handleAnswerChange}
          />
        </div>
        <div className="question-form">
          <span>{t.question4}</span>
          <textarea
            id="OUTSIDE_FREQUENCY"
            name="OUTSIDE_FREQUENCY"
            placeholder="text"
            required
            value={answers.OUTSIDE_FREQUENCY}
            onChange={handleAnswerChange}
          />
        </div>
        <div className="question-form">
          <span>{t.question5}</span>
          <textarea
            id="BATH_PLAN"
            name="BATH_PLAN"
            placeholder="text"
            required
            value={answers.BATH_PLAN}
            onChange={handleAnswerChange}
          />
        </div>
      </div>
    </div>
  );
}

export default AdoptForm2;
