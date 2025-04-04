import { Form, Link } from "react-router-dom";
import "./signupForm.css";
import { useState } from "react";
import AuthPhoto from "/images/auth.png";
import Logo from "/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SingupForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="signup-page">
      <div className="signup-left">
        <img src={AuthPhoto} alt="auth-image" />
        <img src={Logo} alt="logo" />
      </div>
      <div className="signup-right">
        <div className="signup-top">
          <span className="page-name">Account</span>
          <span className="title">Sign up</span>
        </div>
        <div className="signup-mid">
          <Form className="signup-form">
            <div className="name">
              <div className="first-name">
                <label htmlFor="first-name">First Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="first-name"
                    placeholder="First Name"
                    required
                  />
                </div>
              </div>
              <div className="last-name">
                <label htmlFor="last-name">Last Name</label>
                <div className="input-wrapper">
                  <input type="text" name="last-name" placeholder="Last Name" required />
                </div>
              </div>
            </div>
            <div className="email"></div>
            <label htmlFor="email">Email</label>
            <div className="input-wrapper email">
              <input type="email" name="email" placeholder="Email" required />
            </div>
            <label htmlFor="password">Password</label>
            <div className="input-wrapper password">
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
            <label htmlFor="phone">Phone Number</label>
            <div className="input-wrapper">
              <input type="tel" name="phone" placeholder="Phone Number" required />
            </div>
            <label htmlFor="address">Address</label>
            <div className="input-wrapper">
              <input type="text" name="address" placeholder="Address" required />
            </div>
            <span className="policy">
              By creating an account, you agree to the <u>Terms of use</u> and{" "}
              <u>Privacy Policy</u>.
            </span>
            <button type="submit">Sign up</button>
          </Form>
        </div>
        <div className="signup-btm">
          <span>
            Already have an account?{" "}
            <Link to="/login">
              <u>Log in</u>
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}

export default SingupForm;
