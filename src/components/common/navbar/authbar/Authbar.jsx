import { Link, useNavigate } from "react-router-dom";
import "./authbar.css";
import { useLanguage } from "../../../../context/language/LanguageContext";
import { useAuth } from "../../../../context/auth/AuthContext";

function Authbar() {
  const { language } = useLanguage();
  const { isAuthenticated, logout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!token) {
      console.error("토큰이 없습니다.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.VITE_API_BASE_URL}/api/account/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        logout();
        navigate("/");
      } else {
        const error = await response.json();
        console.error("로그아웃 실패:", error);
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
