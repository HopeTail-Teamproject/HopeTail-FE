import { Form, Link } from "react-router-dom";
import "./loginForm.css";
import { useState } from "react";
import AuthPhoto from "/images/auth.png";
import Logo from "/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { loginPage } from "../../lib/auth";
import { useLanguage } from "../../context/language/LanguageContext";

function LoginForm({ actionData, isSubmitting }) {
  const [showPassword, setShowPassword] = useState(false);
  const { language } = useLanguage();
  const t = loginPage[language];

  return (
    <section className="login-page">
      <div className="login-left">
        <img src={AuthPhoto} alt="auth-image" />
        <img src={Logo} alt="logo" />
      </div>
      <div className="login-right">
        <div className="login-top">
          <span className="page-name">{t.pageName}</span>
          <span className="title">{t.title}</span>
          <span className="subtitle">{t.subtitle}</span>
        </div>
        <div className="login-mid">
          <Form method="post" className="login-form">
            {actionData?.error && (
              <div className="error-message">
                {typeof actionData.error === "string"
                  ? actionData.error
                  : "로그인에 실패했습니다."}
              </div>
            )}
            <label htmlFor="email">{t.emailLabel}</label>
            <div className="input-wrapper">
              <input type="email" name="email" placeholder={t.emailLabel} required />
            </div>
            <label htmlFor="password">{t.passwordLabel}</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={t.passwordLabel}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={faEyeSlash} />
              </button>
            </div>
            <div className="remember">
              <input type="checkbox" name="rememberMe" />
              <label htmlFor="rememberMe">{t.rememberMe}</label>
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </Form>
        </div>
        <div className="login-btm">
          <span>{t.noAccount}</span>
          <Link to="/signup">
            <button>{t.create}</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
