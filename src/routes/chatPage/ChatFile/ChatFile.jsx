import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LeftSidebar from "../../../components/common/leftSidebar/LeftSidebar";
import "./ChatFile.css";

const ChatFile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { requests, userEmail, petId } = location.state || {};

  if (!requests || !userEmail || !petId) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="chat-file-container">
      <LeftSidebar />
      <div className="chat-file">
        <div className="chat-file-header">
          <h2>{userEmail}님의 입양 신청서</h2>
          <button onClick={() => navigate(-1)} className="back-button">
            뒤로 가기
          </button>
        </div>
        <div className="requests-container">
          {requests.map((request) => (
            <div key={request.requestId} className="request-card">
              <div className="request-header">
                <h3>신청서 #{request.requestId}</h3>
                <span className="submission-date">{formatDate(request.submittedAt)}</span>
              </div>

              {request.homeImages && request.homeImages.length > 0 && (
                <div className="home-images">
                  <h4>거주 환경 사진</h4>
                  <div className="image-grid">
                    {request.homeImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`거주 환경 ${index + 1}`}
                        className="home-image"
                      />
                    ))}
                  </div>
                </div>
              )}

              {request.answers && request.answers.length > 0 && (
                <div className="answers-section">
                  <h4>입양 신청 답변</h4>
                  {request.answers.map((answer, index) => (
                    <div key={index} className="answer-item">
                      <h5>{answer.questionType}</h5>
                      <p>{answer.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatFile;
