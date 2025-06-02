import default_img from "/images/default_img.png";
import "./chatPetInfo.css";
import { useLanguage } from "../../../context/language/LanguageContext";
import { chatPage } from "../../../lib/chat";

function ChatPetInfo({ petInfo }) {
  const { language } = useLanguage();
  const t = chatPage[language]?.chatPetInfo || chatPage.ko.chatPetInfo;

  if (!petInfo) {
    return <div>{t.loading}</div>;
  }

  return (
    <section className="chatPetInfo">
      <div className="top">
        <img src={petInfo.photoUrl || default_img} alt="pet_main_img" />
      </div>
      <div className="main">
        <h1 className="name">{petInfo.name}</h1>
        <span>{t.age}: {petInfo.age}{t.years}</span>
        <span>{t.species}: {petInfo.species}</span>
        <span>{t.location}: {petInfo.address}</span>
        <span>{t.description}: {petInfo.description}</span>
      </div>
    </section>
  );
}

export default ChatPetInfo;
