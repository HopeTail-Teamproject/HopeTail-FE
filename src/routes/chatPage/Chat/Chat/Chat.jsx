import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../../context/auth/AuthContext";
import "./chat.css";
import userImg from "/images/default_img.png";

export default function Chat({
  petId,
  chatRoomId: initialChatRoomId,
  selectedUser,
  isFromList,
  onBack,
  petInfo,
}) {
  const location = useLocation();
  const { token, user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatRoomId, setChatRoomId] = useState(initialChatRoomId);
  const [chatRoomInfo, setChatRoomInfo] = useState(null);
  const stompClientRef = useRef(null);
  const messagesEndRef = useRef(null);

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

    // 채팅방이 없는 경우에만 생성
    const initializeChatRoom = async () => {
      if (chatRoomId) return; // 이미 채팅방 ID가 있으면 생성하지 않음

      try {
        console.log("채팅방 생성 요청:", {
          url: `${process.env.VITE_API_BASE_URL}/chatrooms`,
          body: {
            partnerEmail: isFromList ? selectedUser : petInfo?.email,
          },
        });

        // 채팅방 생성
        const response = await fetch(`${process.env.VITE_API_BASE_URL}/chatrooms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            partnerEmail: isFromList ? selectedUser : petInfo?.email,
          }),
        });

        console.log("채팅방 생성 응답:", {
          status: response.status,
          statusText: response.statusText,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("채팅방 생성 에러:", errorData);
          throw new Error(
            errorData.message ||
              `채팅방 생성에 실패했습니다. (${response.status}: ${
                errorData.error || response.statusText
              })`
          );
        }

        const data = await response.json();
        console.log("채팅방 생성 성공:", data);
        setChatRoomId(data.chatRoomId);

        // 채팅방 정보 조회
        const roomResponse = await fetch(
          `${process.env.VITE_API_BASE_URL}/chatrooms/${data.chatRoomId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!roomResponse.ok) {
          throw new Error("채팅방 정보를 가져오는데 실패했습니다.");
        }

        const roomData = await roomResponse.json();
        console.log("채팅방 정보:", roomData);
        setChatRoomInfo(roomData);
      } catch (error) {
        console.error("채팅방 초기화 중 오류:", error);
        alert(error.message);
      }
    };

    initializeChatRoom();
  }, [token, user, petId, selectedUser, isFromList, chatRoomId, petInfo]);

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
          <>
            <button className="back-button" onClick={onBack}>
              ←
            </button>
            <h3>
              {chatRoomInfo
                ? `${chatRoomInfo.member1Username}님과 ${chatRoomInfo.member2Username}님의 대화`
                : `${selectedUser}님과의 대화`}
            </h3>
          </>
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
