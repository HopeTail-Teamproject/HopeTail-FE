import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
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

    console.log("WebSocket 연결 시작:", { chatRoomId, token });

    // SockJS 옵션 설정
    const socket = new SockJS(
      `${process.env.VITE_API_BASE_URL}/ws/chat?token=${token}`,
      null,
      {
        transports: ["websocket", "xhr-streaming", "xhr-polling"],
        timeout: 5000,
      }
    );

    // 연결 상태 모니터링
    socket.onopen = () => {
      console.log("SockJS 연결 성공");
    };

    socket.onclose = (event) => {
      console.log("SockJS 연결 종료:", event);
    };

    socket.onerror = (error) => {
      console.error("SockJS 오류:", error);
    };

    const stompClient = Stomp.over(socket);

    // 디버그 모드 활성화
    stompClient.debug = (str) => {
      console.log("STOMP Debug:", str);
      // 모든 STOMP 프레임 로깅
      if (str.startsWith(">>>") || str.startsWith("<<<")) {
        console.log("STOMP Frame:", str);
      }
    };

    // 연결 옵션 설정
    const connectHeaders = {
      "heart-beat": "10000,10000",
      "accept-version": "1.1,1.0",
      login: token, // 토큰을 login 헤더로 전송
      passcode: "guest", // 필요한 경우 passcode 추가
    };

    console.log("STOMP 연결 시도...");
    stompClient.connect(
      connectHeaders,
      (frame) => {
        console.log("STOMP CONNECTED 프레임 수신:", frame);
        console.log("연결된 STOMP 클라이언트:", {
          connected: stompClient.connected,
          ws: stompClient.ws ? "연결됨" : "연결 안됨",
          subscriptions: Object.keys(stompClient.subscriptions || {}),
        });

        // 구독 전에 현재 채팅방 ID 확인
        console.log("구독 시작 - 채팅방 ID:", chatRoomId);

        // 구독 경로 확인
        const subscribePath = `/queue/chatroom/${chatRoomId}`;
        console.log("구독 경로:", subscribePath);

        try {
          const subscription = stompClient.subscribe(subscribePath, (msg) => {
            console.log("메시지 수신됨:", msg);
            console.log("메시지 헤더:", msg.headers);
            console.log("메시지 본문:", msg.body);
            try {
              const payload = JSON.parse(msg.body);
              console.log("파싱된 메시지:", payload);
              setMessages((prev) => {
                console.log("이전 메시지:", prev);
                const newMessages = [...prev, payload];
                console.log("새로운 메시지 목록:", newMessages);
                return newMessages;
              });
            } catch (error) {
              console.error("메시지 파싱 오류:", error);
            }
          });

          console.log("구독 완료:", {
            id: subscription.id,
            destination: subscription.destination,
            unsubscribe: !!subscription.unsubscribe,
          });
        } catch (error) {
          console.error("구독 중 오류 발생:", error);
        }
      },
      (error) => {
        console.error("WebSocket 연결 오류:", error);
        console.log("재연결 시도 예정...");
        setTimeout(() => {
          console.log("WebSocket 재연결 시도...");
        }, 5000);
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

  // 메시지 전송
  const sendMessage = () => {
    if (!stompClientRef.current || !inputMessage.trim() || !chatRoomId) {
      console.log("메시지 전송 조건 미충족:", {
        stompClient: !!stompClientRef.current,
        message: inputMessage.trim(),
        chatRoomId,
      });
      return;
    }

    const message = {
      chatRoomId: Number(chatRoomId),
      receiverId: isFromList ? selectedUser : petInfo?.email,
      content: inputMessage.trim(),
    };

    console.log("전송할 메시지:", message);
    console.log("STOMP 클라이언트 상태:", {
      connected: stompClientRef.current.connected,
      ws: stompClientRef.current.ws ? "연결됨" : "연결 안됨",
    });

    try {
      console.log("메시지 전송 시작...");
      stompClientRef.current.send(
        "/pub/chat/private",
        {},
        JSON.stringify(message),
        (receipt) => {
          console.log("메시지 전송 영수증:", receipt);
        }
      );
      console.log("메시지 전송 완료");
      setInputMessage("");
    } catch (error) {
      console.error("메시지 전송 중 오류:", error);
    }
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
        {messages.map((msg, index) => {
          console.log("렌더링할 메시지:", msg);
          return (
            <div
              key={index}
              className={`message ${msg.senderId === user?.email ? "sent" : "received"}`}
            >
              <div className="message-content">{msg.content}</div>
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
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}
