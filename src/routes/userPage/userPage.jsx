import React, { useState } from "react";
import "./UserPage.css";
import { useLanguage } from "../../context/language/LanguageContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="user-page">
      <div className="user-content">
        <div className="left-panel">
          <div className="profile-image">
            <img src="/images/user.png" alt="User" />
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
              <img src="/images/chat.png" alt="Chat" />
              <span>Chat</span>
            </div>
            <div onClick={() => navigate("/bookmark")}>
              <img src="/images/bookmark.png" alt="Bookmark" />
              <span>Bookmark</span>
            </div>
            <div onClick={() => navigate("/favorites")}>
              <img src="/images/favorites.png" alt="Favorites" />
              <span>Favorites</span>
            </div>
            <div onClick={() => navigate("/files")}>
              <img src="/images/files.png" alt="Files" />
              <span>Files</span>
            </div>
            <div onClick={() => navigate("/rehome2")}>
              <img src="/images/rehome.png" alt="Rehome" />
              <span>Rehome</span>
            </div>
            <div onClick={() => alert("기부는 준비 중입니다.")}>
              <img src="/images/donate.png" alt="Donate" />
              <span>Donate</span>
            </div>
          </div>

          <div className="about-section">
            <textarea placeholder="Write about you" />
          </div>
          <button className="change-button">Change</button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
