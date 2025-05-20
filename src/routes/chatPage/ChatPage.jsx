import Chat from "./Chat/Chat/Chat";
import ChatPetInfo from "./PetInfo/ChatPetInfo";
import "./ChatPage.css";
import ChatList from "./Chat/ChatList/ChatList";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/language/LanguageContext";
import { chatPage } from "../../lib/chat";

function ChatPage() {
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const [petInfo, setPetInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = chatPage[language] || chatPage.ko;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert(t.loginRequired);
      navigate("/login");
      return;
    }
  }, [navigate, t.loginRequired]);

  useEffect(() => {
    const fetchPetInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) {
          console.log("Token or user not found");
          setLoading(false);
          return;
        }

        console.log("Fetching pet info for ID:", id);
        const response = await fetch(
          `${process.env.VITE_API_BASE_URL}/api/petposts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("유기견 정보를 가져오는데 실패했습니다.");
        }

        const data = await response.json();
        console.log("Pet Info API Response:", data);
        setPetInfo(data);
        setIsOwner(data.email === user.email);
      } catch (error) {
        console.error("유기견 정보 조회 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPetInfo();
    } else {
      console.log("No pet ID provided");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="loading">{t.loading}</div>;
  }

  if (!petInfo) {
    return <div className="error">{t.error}</div>;
  }

  return (
    <section className="chatPage">
      <div className="left">
        <ChatPetInfo petInfo={petInfo} />
      </div>
      <div className="right">
        {isOwner ? <ChatList petId={id} /> : <Chat petId={id} />}
      </div>
    </section>
  );
}

export default ChatPage;
