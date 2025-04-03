import { Form, Link } from "react-router-dom";
import "./loginForm.css";
import { useState } from "react";
import AuthPhoto from "/images/auth.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="login-page">
      <div className="login-left">
        <img src={AuthPhoto} alt="auth-image" />
      </div>
      <div className="login-right">
        <div className="login-top">
          <span className="page-name">Account</span>
          <span className="title">Log in</span>
          <span className="subtitle">To access your account</span>
        </div>
        <div className="login-mid">
          <Form className="login-form">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input type="email" name="email" placeholder="Email" required />
            </div>
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
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
              <input type="checkbox" name="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type="submit">Sign in</button>
          </Form>
        </div>
        <div className="login-btm">
          <span>Don't have an account?</span>
          <Link to="/signup">
            <button>Create an account</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
