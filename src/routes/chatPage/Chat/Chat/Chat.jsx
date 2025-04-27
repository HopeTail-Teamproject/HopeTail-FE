import { useState, useEffect, useRef } from "react";
import "./chat.css";
import userImg from "/images/default_img.png";

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕!", sender: "other", time: "10:00" },
    { id: 2, text: "안녕하세요!", sender: "me", time: "10:01" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.sender === "me" ? "me" : "other"}`}
          >
            <div className="user-image">
              <img
                src={msg.sender === "me" ? userImg : userImg}
                alt={`${msg.sender} avatar`}
                className="avatar"
              />
            </div>
            <div className="message-bubble">
              <div>{msg.text}</div>
              <div className="message-time">{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input-area">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="메시지를 입력하세요"
        />
        <button className="chat-send-button" onClick={sendMessage}>
          전송
        </button>
      </div>
    </div>
  );
}
