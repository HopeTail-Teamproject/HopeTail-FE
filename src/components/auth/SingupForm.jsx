import { Form, Link } from "react-router-dom";
import "./signupForm.css";
import { useState } from "react";
import AuthPhoto from "/images/auth.png";
import Logo from "/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../context/language/LanguageContext";
import { signupPage } from "../../lib/auth";

function SingupForm({ actionData, isSubmitting }) {
  const [showPassword, setShowPassword] = useState(false);
  const { language } = useLanguage();

  const t = signupPage[language];

  return (
    <section className="signup-page">
      <div className="signup-left">
        <img src={AuthPhoto} alt="auth-image" />
        <img src={Logo} alt="logo" />
      </div>
      <div className="signup-right">
        <div className="signup-top">
          <span className="page-name">{t.pageName}</span>
          <span className="title">{t.title}</span>
        </div>
        <div className="signup-mid">
          <Form method="post" className="signup-form">
            {actionData?.error && <div className="error-message">{actionData.error}</div>}
            <label htmlFor="username">{t.usernameLabel}</label>
            <div className="input-wrapper username">
              <input type="text" name="username" placeholder={t.usernameLabel} required />
            </div>
            <label htmlFor="email">{t.emailLabel}</label>
            <div className="input-wrapper email">
              <input type="email" name="email" placeholder={t.emailLabel} required />
            </div>
            <label htmlFor="password">{t.passwordLabel}</label>
            <div className="input-wrapper password">
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
            <label htmlFor="phoneNumber">{t.phoneLabel}</label>
            <div className="input-wrapper">
              <input type="tel" name="phoneNumber" placeholder={t.phoneLabel} required />
            </div>
            <label htmlFor="address">{t.addressLabel}</label>
            <div className="input-wrapper">
              <input type="text" name="address" placeholder={t.addressLabel} required />
            </div>
            <span className="policy">
              {t.policyTextStart} <u>{t.termsOfUse}</u> {t.policyTextMiddle}
              <u>{t.privacyPolicy}</u> {t.policyTextLast}
            </span>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </Form>
        </div>
        <div className="signup-btm">
          <span>
            {t.alreadyHaveAccount}
            <Link to="/login">
              <u>{t.login}</u>
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}

export default SingupForm;
