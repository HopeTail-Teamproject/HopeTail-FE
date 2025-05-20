import default_img from "/images/default_img.png";
import "./chatPetInfo.css";
import { useLanguage } from "../../../context/language/LanguageContext";

function ChatPetInfo({ petInfo }) {
  const { language } = useLanguage();

  if (!petInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <section className="chatPetInfo">
      <div className="top">
        <img src={petInfo.photoUrl || default_img} alt="pet_main_img" />
      </div>
      <div className="main">
        <h1 className="name">{petInfo.name}</h1>
        <span>나이: {petInfo.age}살</span>
        <span>품종: {petInfo.species}</span>
        <span>위치: {petInfo.address}</span>
        <span>설명: {petInfo.description}</span>
      </div>
    </section>
  );
}

export default ChatPetInfo;
