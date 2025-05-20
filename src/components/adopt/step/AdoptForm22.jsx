import "./adoptForm22.css";
import { useLanguage } from "../../../context/language/LanguageContext";
import { adoptForm22Text } from "../../../lib/adopt";
import { useState } from "react";

function AdoptForm22({ onAnswersSubmit }) {
  const { language } = useLanguage();
  const t = adoptForm22Text[language];
  const [answers, setAnswers] = useState({
    EXERCISE: "",
    MEAL_MANAGEMENT: "",
    FINANCIAL: "",
    BEHAVIOR_ISSUE: "",
    VACATION_CARE: "",
    TEN_YEAR_RESPONSIBILITY: "",
  });

  const handleAnswerChange = (e) => {
    const { name, value } = e.target;

    setAnswers((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 모든 답변이 입력되었는지 확인
    const newAnswers = { ...answers, [name]: value };
    const allAnswered = Object.values(newAnswers).every((answer) => answer !== "");

    if (allAnswered) {
      const formattedAnswers = Object.entries(newAnswers).map(
        ([questionType, answer]) => ({
          questionType,
          answer:
            questionType === "TEN_YEAR_RESPONSIBILITY"
              ? answer === "yes"
                ? "Yes"
                : "No"
              : answer,
        })
      );
      onAnswersSubmit(formattedAnswers);
    }
  };

  return (
    <div className="adopt-form22">
      <div className="form22-main">
        <div className="question-form">
          <span>{t.question1}</span>
          <textarea
            id="EXERCISE"
            name="EXERCISE"
            placeholder="text"
            required
            value={answers.EXERCISE}
            onChange={handleAnswerChange}
          />
        </div>
        <div className="question-form">
          <span>{t.question2}</span>
          <textarea
            id="MEAL_MANAGEMENT"
            name="MEAL_MANAGEMENT"
            placeholder="text"
            required
            value={answers.MEAL_MANAGEMENT}
            onChange={handleAnswerChange}
          />
        </div>
        <div className="question-form">
          <span>{t.question3}</span>
          <textarea
            id="FINANCIAL"
            name="FINANCIAL"
            placeholder="text"
            required
            value={answers.FINANCIAL}
            onChange={handleAnswerChange}
          />
        </div>
        <div className="question-form">
          <span>{t.question4}</span>
          <textarea
            id="BEHAVIOR_ISSUE"
            name="BEHAVIOR_ISSUE"
            placeholder="text"
            required
            value={answers.BEHAVIOR_ISSUE}
            onChange={handleAnswerChange}
          />
        </div>
        <div className="question-form">
          <span>{t.question5}</span>
          <textarea
            id="VACATION_CARE"
            name="VACATION_CARE"
            placeholder="text"
            required
            value={answers.VACATION_CARE}
            onChange={handleAnswerChange}
          />
        </div>
        <div className="radio-form">
          <span>{t.question6}</span>
          <div className="radio-box">
            <label>
              {language === "kr" ? "예" : "Yes"}
              <input
                type="radio"
                name="TEN_YEAR_RESPONSIBILITY"
                value="yes"
                required
                onChange={handleAnswerChange}
                checked={answers.TEN_YEAR_RESPONSIBILITY === "yes"}
              />
            </label>
            <label>
              {language === "kr" ? "아니오" : "No"}
              <input
                type="radio"
                name="TEN_YEAR_RESPONSIBILITY"
                value="no"
                required
                onChange={handleAnswerChange}
                checked={answers.TEN_YEAR_RESPONSIBILITY === "no"}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdoptForm22;
