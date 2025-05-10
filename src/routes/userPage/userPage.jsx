import React, { useState } from "react";
import "./UserPage.css";
import Navbar from "../../components/common/navbar/Navbar";
import Footer from "../../components/common/footer/Footer";
import { useLanguage } from "../../context/language/LanguageContext";
import { useNavigate } from "react-router-dom";

import userImg from "../../assets/user.png";
import chatIcon from "../../assets/chat.png";
import bookmarkIcon from "../../assets/bookmark.png";
import favoritesIcon from "../../assets/favorites.png";
import filesIcon from "../../assets/files.png";
import rehomeIcon from "../../assets/rehome.png";
import donateIcon from "../../assets/donate.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="user-page">
      <Navbar />
      <div className="user-content">
        <div className="left-panel">
          <div className="profile-image">
            <img src={userImg} alt="User" />
          </div>

          <div className="input-section">
            <div className="input-row">
              <div className="input-group">
                <label>First Name</label>
                <input type="text" placeholder="Hope" />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input type="text" placeholder="Tail" />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="hopetail@gmail.com" />
              </div>
              <div className="input-group">
                <label>Password</label>
                <div className="password-box">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="hopetail1234!"
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <div className="input-group">
              <label>Phone number</label>
              <input type="text" placeholder="010-1234-1234" />
            </div>

            <div className="input-group">
              <label>Address</label>
              <input
                type="text"
                placeholder="252, Wangsimni-ro, Seongdong-gu, Seoul, Republic of Korea"
              />
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="icon-buttons">
            <div onClick={() => navigate("/chat")}>
              <img src={chatIcon} alt="Chat" />
              <span>Chat</span>
            </div>
            <div onClick={() => navigate("/bookmark")}>
              <img src={bookmarkIcon} alt="Bookmark" />
              <span>Bookmark</span>
            </div>
            <div onClick={() => navigate("/favorites")}>
              <img src={favoritesIcon} alt="Favorites" />
              <span>Favorites</span>
            </div>
            <div onClick={() => navigate("/files")}>
              <img src={filesIcon} alt="Files" />
              <span>Files</span>
            </div>
            <div onClick={() => navigate("/rehome2")}>
              <img src={rehomeIcon} alt="Rehome" />
              <span>Rehome</span>
            </div>
            <div onClick={() => alert("기부는 준비 중입니다.")}>
              <img src={donateIcon} alt="Donate" />
              <span>Donate</span>
            </div>
          </div>

          <div className="about-section">
            <textarea placeholder="Write about you" />
          </div>
          <button className="change-button">Change</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;
