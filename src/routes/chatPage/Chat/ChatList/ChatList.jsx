import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import userImg from "/images/default_img.png";
import "./chatList.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ChatList() {
  const [chatList, setChatList] = useState([]);
  const { id: petId } = useParams();

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          `${process.env.VITE_API_BASE_URL}/api/adoption/${petId}/requests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("채팅 목록을 가져오는데 실패했습니다.");
        }

        const data = await response.json();
        setChatList(data);
      } catch (error) {
        console.error("채팅 목록 조회 중 오류 발생:", error);
      }
    };

    if (petId) {
      fetchChatList();
    }
  }, [petId]);

  return (
    <div className="chat-container">
      <div className="chat-list">
        {chatList.map((chat) => (
          <div key={chat.requestId} className="chat-item">
            <img src={userImg} alt={chat.applicantEmail} />
            <div className="chat-name">
              <span>{chat.applicantEmail}</span>
            </div>
            <div className="file">
              <FontAwesomeIcon icon={faEnvelopeOpenText} className="file-icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;
