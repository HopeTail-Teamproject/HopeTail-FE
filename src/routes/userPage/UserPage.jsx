import React, { useState } from "react";
import "./UserPage.css";
import { useLanguage } from "../../context/language/LanguageContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: "Hope",
    email: "hopetail.official@gmail.com",
    password: "hopetail1234!",
    phone: "010-1234-1234",
    address: "252, Wangsimni-ro, Seongdong-gu, Seoul, Republic of Korea",
    about: "",
  });

  const handleInputChange = (field) => (e) => {
    setUserInfo({ ...userInfo, [field]: e.target.value });
  };

  const handleChange = () => {
    alert("Change feature is under development with backend integration.");
    console.log("Submitted user info:", userInfo);
  };

  return (
    <div className="user-page">
      <div className="user-content">
        <div className="left-panel">
          <div className="profile-image">
            <img src="/HopeTail-FE/images/user.png" alt="User" />
          </div>

          <div className="input-section">
            <div className="input-group wide">
              <label>Username</label>
              <input
                type="text"
                value={userInfo.username}
                onChange={handleInputChange("username")}
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={handleInputChange("email")}
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <div className="password-box">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={userInfo.password}
                    onChange={handleInputChange("password")}
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
            </div>

            <div className="input-group wide">
              <label>Phone number</label>
              <input
                type="text"
                value={userInfo.phone}
                onChange={handleInputChange("phone")}
              />
            </div>

            <div className="input-group wide">
              <label>Address</label>
              <input
                type="text"
                value={userInfo.address}
                onChange={handleInputChange("address")}
              />
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="icon-buttons">
            <div onClick={() => navigate("/chat")}>
              <img src="/HopeTail-FE/images/chat.png" alt="Chat" />
              <span>Chat</span>
            </div>
            <div onClick={() => navigate("/user/bookmark")}>
              <img src="/HopeTail-FE/images/bookmark.png" alt="Bookmark" />
              <span>Bookmark</span>
            </div>
            <div onClick={() => navigate("/user/favorites")}>
              <img src="/HopeTail-FE/images/favorites.png" alt="Favorites" />
              <span>Favorites</span>
            </div>
            <div onClick={() => navigate("/user/files")}>
              <img src="/HopeTail-FE/images/files.png" alt="Files" />
              <span>Files</span>
            </div>
            <div onClick={() => navigate("/rehome/list")}>
              <img src="/HopeTail-FE/images/rehome.png" alt="Rehome" />
              <span>Rehome</span>
            </div>
            <div onClick={() => navigate("/about")}>
              <img src="/HopeTail-FE/images/donate.png" alt="Donate" />
              <span>Donate</span>
            </div>
          </div>

          <div className="about-section">
            <textarea
              placeholder="Write about you"
              value={userInfo.about}
              onChange={handleInputChange("about")}
            />
          </div>

          <button className="change-button" onClick={handleChange}>
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
