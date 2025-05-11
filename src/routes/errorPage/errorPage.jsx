import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ErrorPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMobileScreenButton,
  faEnvelope,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

import logo from "../../assets/logo.png";
import dogImg from "../../assets/dog_pic.png";

const ErrorPage = () => {
  const location = useLocation();
  const isStandalonePreview = location.pathname === "/error-preview";

  return (
    <div className="error-wrapper">
      {isStandalonePreview && (
        <nav className="custom-navbar">
          <div className="nav-left">
            <Link to="/" className="logo">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="nav-main">
            <Link to="/adopt">Adopt</Link>
            <Link to="/rehome">Rehome</Link>
            <Link to="/community">Community</Link>
            <Link to="/care-guide">Care Guide</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="nav-right">
            <button className="login-btn">Log in</button>
            <button className="signup-btn">Sign up</button>
          </div>
        </nav>
      )}

      <main className="error-container">
        <div className="error-content">
          <h1 className="error-title">404 Error - Page Not Found</h1>
          <div className="dog-illustration">
            <img src={dogImg} alt="Dog illustration" />
          </div>
        </div>
      </main>

      {isStandalonePreview && (
        <section className="footer">
          <div className="footer-left">
            <span className="logo">HopeTail</span>
            <span className="phone">
              <FontAwesomeIcon icon={faMobileScreenButton} />
              010-1234-1234
            </span>
            <span className="email">
              <FontAwesomeIcon icon={faEnvelope} />
              Hopetail1234@gmail.com
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
            <select name="language" id="language">
              <option value="en">English (United States)</option>
              <option value="kr">한국어</option>
            </select>
          </div>
        </section>
      )}
    </div>
  );
};

export default ErrorPage;