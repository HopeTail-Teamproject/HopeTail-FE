import { Link } from "react-router-dom";
import "./authbar.css";
import { useLanguage } from "../../../../context/language/LanguageContext";
import { useAuth } from "../../../../context/auth/AuthContext";

function Authbar() {
  const { language } = useLanguage();
  const { isAuthenticated, logout, token } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/account/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        logout();
      } else {
        console.error("로그아웃 실패");
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return (
    <section className="authbar">
      {!isAuthenticated ? (
        <>
          <Link to="/login" className="login-btn">
            {language === "kr" ? "로그인" : "Log in"}
          </Link>
          <Link to="/signup" className="signup-btn">
            {language === "kr" ? "회원가입" : "Sign up"}
          </Link>
        </>
      ) : (
        <button onClick={handleLogout} className="login-btn">
          {language === "kr" ? "로그아웃" : "Log out"}
        </button>
      )}
    </section>
  );
}

export default Authbar;
