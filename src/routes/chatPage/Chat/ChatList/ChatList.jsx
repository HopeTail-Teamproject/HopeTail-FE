import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import userImg from "/images/default_img.png";
import "./chatList.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/auth/AuthContext";
import { useLanguage } from "../../../../context/language/LanguageContext";
import { chatPage } from "../../../../lib/chat";
import Chat from "../Chat/Chat";

function ChatList() {
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const { id: petId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { language } = useLanguage();
  const t = chatPage[language]?.chat || chatPage.ko.chat;

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
    setSelectedChat({
      selectedUser: chat.applicantEmail,
      isFromList: true,
      chatRoomId: chat.chatRoomId,
    });
  };

  const handleFileClick = (e, chat) => {
    e.stopPropagation();
    navigate(`/adopt/${chat.petId}/${chat.applicantEmail}/file`, {
      state: {
        request: chat,
      },
    });
  };

  if (loading) return <div>{t.loading}</div>;
  if (error) return <div>{t.error}</div>;

  return (
    <div className="chat-container">
      {selectedChat ? (
        <Chat
          petId={petId}
          chatRoomId={selectedChat.chatRoomId}
          selectedUser={selectedChat.selectedUser}
          isFromList={selectedChat.isFromList}
          onBack={() => setSelectedChat(null)}
        />
      ) : (
        <div className="chat-list">
          <h2>{t.applicantsList}</h2>
          {chatList.length === 0 ? (
            <p>{t.noApplicants}</p>
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
      )}
    </div>
  );
}

export default ChatList;
