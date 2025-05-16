import React, { useState } from "react";
import "./UserPage.css";
import { useLanguage } from "../../context/language/LanguageContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = () => {
    alert("Change feature is under development with backend integration.");
  };

  return (
    <div className="user-page">
      <div className="user-content">
        {/* 왼쪽 영역 */}
        <div className="left-panel">
          <div className="profile-image">
            <img src="/HopeTail-FE/images/user.png" alt="User" />
          </div>

          <div className="input-section">
            <div className="input-group">
              <label>Username</label>
              <input type="text" placeholder="Hope" />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="hopetail.official@gmail.com" />
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

        {/* 오른쪽 영역 */}
        <div className="right-panel">
          <div className="icon-buttons">
            <div onClick={() => navigate("/chat")}>
              <img src="/HopeTail-FE/images/chat.png" alt="Chat" />
              <span>Chat</span>
            </div>
            <div onClick={() => navigate("/bookmark")}>
              <img src="/HopeTail-FE/images/bookmark.png" alt="Bookmark" />
              <span>Bookmark</span>
            </div>
            <div onClick={() => navigate("/favorites")}>
              <img src="/HopeTail-FE/images/favorites.png" alt="Favorites" />
              <span>Favorites</span>
            </div>
            <div onClick={() => navigate("/files")}>
              <img src="/HopeTail-FE/images/files.png" alt="Files" />
              <span>Files</span>
            </div>
            <div onClick={() => navigate("/rehome2")}>
              <img src="/HopeTail-FE/images/rehome.png" alt="Rehome" />
              <span>Rehome</span>
            </div>
            <div onClick={() => alert("Donation feature coming soon.")}>
              <img src="/HopeTail-FE/images/donate.png" alt="Donate" />
              <span>Donate</span>
            </div>
          </div>

          <div className="about-section">
            <textarea placeholder="Write about you" />
          </div>
          <button className="change-button" onClick={handleChange}>Change</button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
