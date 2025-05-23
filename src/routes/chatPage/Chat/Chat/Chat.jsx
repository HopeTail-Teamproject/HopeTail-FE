import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../../context/auth/AuthContext";
import "./chat.css";
import userImg from "/images/default_img.png";

export default function Chat() {
  const { id: petId } = useParams();
  const location = useLocation();
  const { token, user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatRoomId, setChatRoomId] = useState(null);
  const stompClientRef = useRef(null);
  const messagesEndRef = useRef(null);

  // 선택된 사용자 정보 (ChatList에서 전달받은 경우)
  const selectedUser = location.state?.selectedUser;
  const isFromList = location.state?.isFromList;

  // 스크롤을 항상 최신 메시지로 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // WebSocket 연결 설정
  useEffect(() => {
    if (!token || !user) return;

    // 채팅방 생성 또는 조회
    const initializeChatRoom = async () => {
      try {
        const response = await fetch(`${process.env.VITE_API_BASE_URL}/api/chatrooms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            partnerEmail: isFromList ? selectedUser : null,
          }),
        });

        if (!response.ok) throw new Error("채팅방 생성 실패");
        const data = await response.json();
        setChatRoomId(data.chatRoomId); // chatRoomId로 변경
      } catch (error) {
        console.error("채팅방 초기화 중 오류:", error);
      }
    };

    initializeChatRoom();
  }, [token, user, petId, selectedUser, isFromList]);

  // WebSocket 연결 및 메시지 구독
  useEffect(() => {
    if (!chatRoomId || !token) return;

    const socket = new SockJS(`${process.env.VITE_API_BASE_URL}/ws/chat`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = (frame) => {
      console.log("WebSocket 연결 성공:", frame);

      // 메시지 구독
      stompClient.subscribe(`/topic/chatroom/${chatRoomId}`, (message) => {
        const msg = JSON.parse(message.body);
        setMessages((prev) => [...prev, msg]);
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("WebSocket 오류:", frame);
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [chatRoomId, token]);

  // 메시지 전송
  const sendMessage = () => {
    if (!stompClientRef.current || !inputMessage.trim() || !chatRoomId) return;

    const message = {
      chatRoomId,
      senderId: user.id,
      receiverId: null, // 백엔드에서 처리
      content: inputMessage.trim(),
    };

    stompClientRef.current.publish({
      destination: "/app/chat/private",
      body: JSON.stringify(message),
    });

    setInputMessage("");
  };

  // Enter 키로 메시지 전송
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        {isFromList ? (
          <h3>{selectedUser}님과의 대화</h3>
        ) : (
          <h3>게시물 작성자와의 대화</h3>
        )}
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.senderId === user?.id ? "sent" : "received"}`}
          >
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}
