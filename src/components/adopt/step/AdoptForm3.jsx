import "./adoptForm3.css";
import { useLanguage } from "../../../context/language/LanguageContext";
import { adoptForm3Text } from "../../../lib/adopt";
import { useState } from "react";

function AdoptForm3({ onAnswersSubmit }) {
  const { language } = useLanguage();
  const t = adoptForm3Text[language];
  const [answers, setAnswers] = useState({
    OTHER_ANIMALS: "",
    OTHER_ANIMAL_DETAIL: "",
    NEUTERED: "",
    VACCINATED: "",
    EXPERIENCE: "",
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
          answer: ["OTHER_ANIMALS", "NEUTERED", "VACCINATED"].includes(questionType)
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
    <div className="adopt-form3">
      <div className="form3-main">
        <div className="radio-form">
          <span>{t.question1}</span>
          <div className="radio-box">
            <label>
              {language === "kr" ? "예" : "Yes"}
              <input
                type="radio"
                name="OTHER_ANIMALS"
                value="yes"
                required
                onChange={handleAnswerChange}
                checked={answers.OTHER_ANIMALS === "yes"}
              />
            </label>
            <label>
              {language === "kr" ? "아니오" : "No"}
              <input
                type="radio"
                name="OTHER_ANIMALS"
                value="no"
                required
                onChange={handleAnswerChange}
                checked={answers.OTHER_ANIMALS === "no"}
              />
            </label>
          </div>
        </div>
        <div className="question-form">
          <span>{t.question2}</span>
          <textarea
            id="OTHER_ANIMAL_DETAIL"
            name="OTHER_ANIMAL_DETAIL"
            placeholder={
              language === "kr"
                ? "없으면 없다고 적어주세요"
                : "If there is no other animal, please write 'none'"
            }
            required
            value={answers.OTHER_ANIMAL_DETAIL}
            onChange={handleAnswerChange}
          />
        </div>
        <div className="radio-form">
          <span>{t.question3}</span>
          <div className="radio-box">
            <label>
              {language === "kr" ? "예" : "Yes"}
              <input
                type="radio"
                name="NEUTERED"
                value="yes"
                required
                onChange={handleAnswerChange}
                checked={answers.NEUTERED === "yes"}
              />
            </label>
            <label>
              {language === "kr" ? "아니오" : "No"}
              <input
                type="radio"
                name="NEUTERED"
                value="no"
                required
                onChange={handleAnswerChange}
                checked={answers.NEUTERED === "no"}
              />
            </label>
          </div>
        </div>
        <div className="radio-form">
          <span>{t.question4}</span>
          <div className="radio-box">
            <label>
              {language === "kr" ? "예" : "Yes"}
              <input
                type="radio"
                name="VACCINATED"
                value="yes"
                required
                onChange={handleAnswerChange}
                checked={answers.VACCINATED === "yes"}
              />
            </label>
            <label>
              {language === "kr" ? "아니오" : "No"}
              <input
                type="radio"
                name="VACCINATED"
                value="no"
                required
                onChange={handleAnswerChange}
                checked={answers.VACCINATED === "no"}
              />
            </label>
          </div>
        </div>
        <div className="question-form">
          <span>{t.question5}</span>
          <textarea
            id="EXPERIENCE"
            name="EXPERIENCE"
            placeholder={
              language === "kr"
                ? "없으면 없다고 적어주세요"
                : "If there is no other animal, please write 'none'"
            }
            required
            value={answers.EXPERIENCE}
            onChange={handleAnswerChange}
          />
        </div>
      </div>
    </div>
  );
}

export default AdoptForm3;
