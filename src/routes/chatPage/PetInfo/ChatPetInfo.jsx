import default_img from "/images/default_img.png";
import "./chatPetInfo.css";
import { useLanguage } from "../../../context/language/LanguageContext";
import { chatPage } from "../../../lib/chat";

function ChatPetInfo({ petInfo }) {
  const { language } = useLanguage();
  const t = chatPage[language]?.chatPetInfo || chatPage.ko.chatPetInfo;

  const getImageUrl = (image) => {
    if (!image) return default_img;
    if (image.startsWith("http")) return image;
    const token = localStorage.getItem("token");
    return `${process.env.VITE_API_BASE_URL}${image}`;
  };

  const handleImageError = async (e, image) => {
    e.target.onerror = null;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.VITE_API_BASE_URL}${image}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        e.target.src = URL.createObjectURL(blob);
      } else {
        e.target.src = default_img;
      }
    } catch (error) {
      console.error("이미지 로드 실패:", error);
      e.target.src = default_img;
    }
  };

  if (!petInfo) {
    return <div>{t.loading}</div>;
  }

  return (
    <section className="chatPetInfo">
      <div className="top">
        <img
          src={getImageUrl(petInfo.photoUrl)}
          alt="pet_main_img"
          onError={(e) => handleImageError(e, petInfo.photoUrl)}
        />
      </div>
      <div className="main">
        <h1 className="name">{petInfo.name}</h1>
        <span>
          {t.age}: {petInfo.age}
          {t.years}
        </span>
        <span>
          {t.species}: {petInfo.species}
        </span>
        <span>
          {t.location}: {petInfo.address}
        </span>
        <span>
          {t.description}: {petInfo.description}
        </span>
      </div>
    </section>
  );
}

export default ChatPetInfo;
