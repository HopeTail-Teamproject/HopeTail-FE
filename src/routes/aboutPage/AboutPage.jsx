import Logo from "/images/logo.png";
import "./aboutPage.css";
import { useLanguage } from "../../context/language/LanguageContext";
import { aboutPage } from "../../lib/about";

function AboutPage() {
  const { language } = useLanguage();
  const t = aboutPage[language];

  return (
    <section className="about">
      <div className="top">
        <h1>{t.title}</h1>
      </div>
      <div className="mid">
        <img src={Logo} alt="logo" />
        <span>{t.first}</span>
        <span>{t.second}</span>
        <span>{t.third}</span>
        <span>{t.fourth}</span>
        <span>{t.fifth}</span>
        <span>{t.sixth}</span>
        <span>{t.seventh}</span>
      </div>
      <div className="bot">
        <span>{t.supportAccount}</span>
        <span>{t.thanks}</span>
      </div>
    </section>
  );
}

export default AboutPage;
