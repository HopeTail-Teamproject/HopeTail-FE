import "./mainPage.css";
import Logo from "/images/logo.png";
import { useLanguage } from "../../context/language/LanguageContext";

function MainPage() {
  const { language } = useLanguage();
  const mainText = {
    ko: "함께 걷는 오늘, 반려견과의 첫 시작",
    en: "Walking Together Today, First Step with Your Pet",
  };

  return (
    <>
      <section className="mainPage">
        <img src={Logo} alt="logo" />
        <div className="box">
          <h1 className="main-title">{mainText[language] || mainText["ko"]}</h1>
        </div>
      </section>
    </>
  );
}

export default MainPage;
