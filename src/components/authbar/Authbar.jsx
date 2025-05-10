import { Link } from "react-router-dom";
import "./Authbar.css";
import { useLanguage } from "../../language/LanguageContext.jsx";

function Authbar() {
  const { language } = useLanguage();

  return (
    <section className="authbar">
      <Link to="/login" className="login-btn">
        {language === "kr" ? "로그인" : "Log in"}
      </Link>
      <Link to="/signup" className="signup-btn">
        {language === "kr" ? "회원가입" : "Sign up"}
      </Link>
    </section>
  );
}

export default Authbar;