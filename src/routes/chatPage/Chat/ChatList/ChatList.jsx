import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import userImg from "/images/default_img.png";
import "./chatList.css";

function ChatList() {
  const chatList = [
    { id: 1, name: "Chat 1" },
    { id: 2, name: "Chat 2" },
  ];

  return (
    <div className="chat-container">
      <div className="chat-list">
        {chatList.map((chat) => (
          <div key={chat.id} className="chat-item">
            <img src={userImg} alt={chat.id} />
            <div className="chat-name">
              <span>{chat.name}</span>
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
