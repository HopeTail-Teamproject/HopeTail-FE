import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import userImg from "/images/default_img.png";
import "./chatList.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/auth/AuthContext";

function ChatList() {
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: petId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    fetchChatList();
  }, [petId]);

  const fetchChatList = async () => {
    try {
      const response = await fetch(
        `${process.env.VITE_API_BASE_URL}/api/adoption/${petId}/requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("입양 신청자 목록을 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      setChatList(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChatClick = (chat) => {
    navigate(`/adopt/${petId}/chat`, {
      state: {
        selectedUser: chat.applicantEmail,
        isFromList: true,
      },
    });
  };

  const handleFileClick = async (e, chat) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `${process.env.VITE_API_BASE_URL}/api/adoption/${chat.petId}/requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("입양 신청서를 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      navigate(`/adopt/${chat.petId}/chatfile`, {
        state: {
          requests: data,
          userEmail: chat.otherUserEmail,
          petId: chat.petId,
        },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div className="chat-container">
      <div className="chat-list">
        <h2>입양 신청자 목록</h2>
        {chatList.length === 0 ? (
          <p>입양 신청자가 없습니다.</p>
        ) : (
          chatList.map((chat) => (
            <div
              key={chat.requestId}
              className="chat-item"
              onClick={() => handleChatClick(chat)}
            >
              <img src={userImg} alt={chat.applicantEmail} />
              <div className="chat-info">
                <span className="user-email">{chat.applicantEmail}</span>
              </div>
              <div className="chat-actions">
                <span className="file-icon" onClick={(e) => handleFileClick(e, chat)}>
                  <FontAwesomeIcon icon={faEnvelopeOpenText} />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ChatList;
