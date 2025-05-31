import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../../context/auth/AuthContext";
import { useLanguage } from "../../../../context/language/LanguageContext";
import { chatPage } from "../../../../lib/chat";
import axios from "axios";
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
  const { language } = useLanguage();
  const t = chatPage[language]?.chat || chatPage.ko.chat;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatRoomId, setChatRoomId] = useState(initialChatRoomId);
  const [chatRoomInfo, setChatRoomInfo] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const stompClientRef = useRef(null);
  const messagesEndRef = useRef(null);

  // 스크롤을 항상 최신 메시지로 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 채팅방 초기화
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
        setChatRoomInfo(data);

        // 채팅방 메시지 목록 조회
        const messagesResponse = await fetch(
          `${process.env.VITE_API_BASE_URL}/chatrooms/${data.chatRoomId}/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!messagesResponse.ok) {
          throw new Error("메시지 목록을 가져오는데 실패했습니다.");
        }

        const messagesData = await messagesResponse.json();
        setMessages(messagesData);
      } catch (error) {
        console.error("채팅방 초기화 중 오류:", error);
        alert(error.message);
      }
    };

    initializeChatRoom();
  }, [token, user, petId, selectedUser, isFromList, chatRoomId, petInfo]);

  // 메시지 목록 조회 함수
  const fetchMessages = async () => {
    if (!chatRoomId) return;

    try {
      const response = await axios.get(
        `${process.env.VITE_API_BASE_URL}/chatrooms/${chatRoomId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        console.log("채팅방 메시지 목록:", response.data);
        setMessages(response.data);
      }
    } catch (error) {
      console.error("메시지 목록 조회 중 오류:", error);
    }
  };

  // 3초마다 메시지 목록 조회
  useEffect(() => {
    if (!chatRoomId) return;

    // 초기 메시지 로드
    fetchMessages();

    // 3초마다 메시지 목록 조회
    const intervalId = setInterval(fetchMessages, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [chatRoomId]);

  // 메시지 전송 함수 수정
  const sendMessage = async () => {
    if (!inputMessage.trim() || !chatRoomId || isSending) {
      console.log("메시지 전송 조건 미충족:", {
        message: inputMessage.trim(),
        chatRoomId,
        isSending,
      });
      return;
    }

    setIsSending(true);

    // 현재 사용자가 member1인지 member2인지 확인
    const isMember1 = chatRoomInfo?.member1Email === user?.email;
    const receiverId = isMember1 ? chatRoomInfo?.member2Id : chatRoomInfo?.member1Id;

    const message = {
      chatRoomId: chatRoomId,
      receiverId: receiverId,
      content: inputMessage.trim(),
    };

    try {
      // 메시지 전송
      if (stompClientRef.current?.connected) {
        // WebSocket 연결이 있는 경우
        stompClientRef.current.send("/pub/chat/private", {}, JSON.stringify(message));
      } else {
        // WebSocket 연결이 없는 경우 HTTP 폴백
        await axios.post(
          `${process.env.VITE_API_BASE_URL}/chatrooms/${chatRoomId}/messages`,
          message,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // 입력창 초기화
      setInputMessage("");

      // 메시지 전송 후 즉시 목록 조회
      fetchMessages();
    } catch (error) {
      console.error("메시지 전송 중 오류:", error);
      alert("메시지 전송에 실패했습니다.");
    } finally {
      setIsSending(false);
    }
  };

  // Enter 키로 메시지 전송
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // WebSocket 메시지 수신 시 처리
  useEffect(() => {
    if (!chatRoomId || !token) return;

    const socket = new SockJS(
      `${process.env.VITE_API_BASE_URL}/ws/chat?token=${token}`,
      null,
      {
        transports: ["websocket", "xhr-streaming", "xhr-polling"],
        timeout: 5000,
      }
    );

    const stompClient = Stomp.over(socket);
    stompClient.debug = (str) => {
      console.log("STOMP Debug:", str);
    };

    const connectHeaders = {
      "heart-beat": "10000,10000",
      "accept-version": "1.1,1.0",
      login: token,
      passcode: "guest",
    };

    stompClient.connect(
      connectHeaders,
      (frame) => {
        console.log("STOMP 연결 성공:", frame);

        const subscribePath = `/sub/chatroom/${chatRoomId}`;
        console.log("구독 경로:", subscribePath);

        try {
          const subscription = stompClient.subscribe(subscribePath, async (msg) => {
            console.log("메시지 수신:", msg);
            // 메시지 수신 시 최신 메시지 목록 조회
            try {
              const response = await axios.get(
                `${process.env.VITE_API_BASE_URL}/chatrooms/${chatRoomId}/messages`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.data) {
                console.log("최신 메시지 목록:", response.data);
                setMessages(response.data);
              }
            } catch (error) {
              console.error("메시지 목록 조회 중 오류:", error);
            }
          });

          console.log("구독 완료:", {
            id: subscription.id,
            destination: subscription.destination,
          });
        } catch (error) {
          console.error("구독 중 오류 발생:", error);
        }
      },
      (error) => {
        console.error("WebSocket 연결 오류:", error);
      }
    );

    stompClientRef.current = stompClient;

    return () => {
      if (stompClientRef.current) {
        console.log("WebSocket 연결 해제");
        stompClientRef.current.disconnect();
      }
    };
  }, [chatRoomId, token]);

  // 초기 메시지 로드
  useEffect(() => {
    if (!chatRoomId) return;
    fetchMessages();
  }, [chatRoomId]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        {isFromList ? (
          <>
            <button className="back-button" onClick={onBack}>
              {t.back}
            </button>
            <h3>
              {chatRoomInfo
                ? `${chatRoomInfo.member1Username}${t.conversationBetween}${chatRoomInfo.member2Username}${t.conversationWith}`
                : `${selectedUser}${t.conversationWith}`}
            </h3>
          </>
        ) : (
          <h3>{t.conversationWithAuthor}</h3>
        )}
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => {
          const isSentByMe = msg.senderEmail === user?.email;
          return (
            <div
              key={msg.id || index}
              className={`message ${isSentByMe ? "sent" : "received"}`}
            >
              <div className="message-header">{msg.senderUsername}</div>
              <div className="message-content">{msg.content}</div>
              <div className="message-time">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t.inputPlaceholder}
          disabled={isSending}
        />
        <button onClick={sendMessage} disabled={isSending}>
          {isSending ? t.sending : t.send}
        </button>
      </div>
    </div>
  );
}
