import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LeftSidebar from "../../../components/common/leftSidebar/LeftSidebar";
import "./ChatFile.css";
import { useLanguage } from "../../../context/language/LanguageContext";
import { chatPage } from "../../../lib/chat";
import { adoptQuestions } from "../../../lib/adopt";

const ChatFile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = chatPage[language]?.chatFile || chatPage.ko.chatFile;
  const { request } = location.state || {};

  if (!request) {
    return <div>{t.loading}</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(language === "en" ? "en-US" : "ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const normalizeString = (str) => {
    return str.toLowerCase().replace(/\s+/g, " ").trim();
  };

  const getQuestionText = (questionType) => {
    console.log("Original questionType:", questionType);
    console.log("Current language:", language);
    console.log("Available questions:", adoptQuestions[language]);

    const normalizedQuestion = normalizeString(questionType);

    // 영어 질문과 매칭되는 키 찾기
    const matchingKey = Object.entries(adoptQuestions.en).find(([_, value]) => {
      const normalizedValue = normalizeString(value);
      console.log("Comparing:", normalizedValue, "with", normalizedQuestion);
      return normalizedValue === normalizedQuestion;
    })?.[0];

    console.log("Matching key:", matchingKey);

    if (matchingKey) {
      const translatedText = adoptQuestions[language][matchingKey];
      console.log("Translated text:", translatedText);
      return translatedText;
    }

    return questionType;
  };

  return (
    <div className="chat-file-container">
      <LeftSidebar />
      <div className="chat-file">
        <div className="chat-file-header">
          <h2>
            {request.applicantEmail}
            {t.application}
          </h2>
          <button onClick={() => navigate(-1)} className="back-button">
            {t.back}
          </button>
        </div>
        <div className="requests-container">
          <div className="request-card">
            <div className="request-header">
              <h3>
                {t.applicationNumber}
                {request.requestId}
              </h3>
              <span className="submission-date">{formatDate(request.submittedAt)}</span>
            </div>

            {request.homeImages && request.homeImages.length > 0 && (
              <div className="home-images">
                <h4>{t.homeImages}</h4>
                <div className="image-grid">
                  {request.homeImages.map((image, index) => (
                    <img
                      key={index}
                      src={`${process.env.VITE_API_BASE_URL}${image}`}
                      alt={`${t.homeImage} ${index + 1}`}
                      className="home-image"
                    />
                  ))}
                </div>
              </div>
            )}

            {request.answers && request.answers.length > 0 && (
              <div className="answers-section">
                <h4>{t.answers}</h4>
                {request.answers.map((answer, index) => {
                  console.log("Answer object:", answer);
                  return (
                    <div key={index} className="answer-item">
                      <h5>{getQuestionText(answer.questionType)}</h5>
                      <p>{answer.answer}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatFile;
