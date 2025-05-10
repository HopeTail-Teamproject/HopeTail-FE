import Authbar from "./authbar/Authbar";
import "./navbar.css";
import { Link } from "react-router-dom";
import Logo from "/images/logo.png";
import { useLanguage } from "../../../context/language/LanguageContext";

function Navbar() {
  const { language } = useLanguage();

  return (
    <nav>
      <div className="nav-left">
        <Link to="/" className="logo">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="nav-main">
        <Link to="/adopt">{language === "kr" ? "입양하기" : "Adopt"}</Link>
        <Link to="/rehome">{language === "kr" ? "재입양하기" : "Rehome"}</Link>
        <Link to="/community">{language === "kr" ? "게시판" : "Community"}</Link>
        <Link to="/care-guide">{language === "kr" ? "케어 가이드" : "Care Guide"}</Link>
        <Link to="/about">{language === "kr" ? "소개" : "About"}</Link>
      </div>
      <div className="nav-right">
        <Authbar />
      </div>
    </nav>
  );
}

export default Navbar;
