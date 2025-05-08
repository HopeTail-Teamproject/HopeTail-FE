import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileScreenButton,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "../language/LanguageContext.jsx";

function Footer() {
  const { language, toggleLanguage } = useLanguage();

  const handleLanguageChange = (e) => {
    toggleLanguage(e.target.value);
  };

  return (
    <section className="footer">
      <div className="footer-left">
        <span className="logo">HopeTail</span>
        <span className="phone">
          <FontAwesomeIcon icon={faMobileScreenButton} />
          010-1234-1234
        </span>
        <span className="email">
          <FontAwesomeIcon icon={faEnvelope} />
          Hopetail@gmail.com
        </span>
        <span className="instagram">
          <FontAwesomeIcon icon={faInstagram} />
          Hope._.tail
        </span>
        <span className="location">
          <FontAwesomeIcon icon={faLocationDot} />
          47, Hanyangdaehak 1-gil, Sangnok-gu, Ansan-si, Gyeonggi-do
        </span>
      </div>
      <div className="footer-right">
        <select
          name="language"
          id="language"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="kr">한국어</option>
          <option value="en">English (United States)</option>
        </select>
      </div>
    </section>
  );
}

export default Footer;