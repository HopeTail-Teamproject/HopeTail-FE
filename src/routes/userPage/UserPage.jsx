import React, { useState, useEffect } from "react";
import "./UserPage.css";
import { useLanguage } from "../../context/language/LanguageContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaRegBookmark } from "react-icons/fa";
import { getUserInfo, updateUserInfo } from "../../lib/user";
import strings from "../../lib/i18n/userPage";

const UserPage = () => {
  const { language } = useLanguage();
  const TEXT = strings[language];
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    about: "",
  });

  useEffect(() => {
    getUserInfo()
      .then((data) => {
        if (!data) return;
        setUserInfo({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          about: data.about || "",
          password: "",
        });
      })
      .catch((err) => {
        console.error("유저 정보 로딩 실패:", err);
      });
  }, []);

  const handleInputChange = (field) => (e) => {
    setUserInfo({ ...userInfo, [field]: e.target.value });
  };

  const handleChange = async () => {
    try {
      await updateUserInfo(userInfo);
      alert(TEXT.alertSuccess);
    } catch (err) {
      console.error("회원 정보 수정 실패:", err);
      alert(TEXT.alertFail);
    }
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
              <label>{TEXT.username}</label>
              <input
                type="text"
                value={userInfo.username}
                onChange={handleInputChange("username")}
                placeholder={TEXT.placeholder.username}
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>{TEXT.email}</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={handleInputChange("email")}
                  placeholder={TEXT.placeholder.email}
                />
              </div>
              <div className="input-group">
                <label>{TEXT.password}</label>
                <div className="password-box">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={userInfo.password}
                    onChange={handleInputChange("password")}
                    placeholder={TEXT.placeholder.password}
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
              <label>{TEXT.phone}</label>
              <input
                type="text"
                value={userInfo.phone}
                onChange={handleInputChange("phone")}
                placeholder={TEXT.placeholder.phone}
              />
            </div>

            <div className="input-group wide">
              <label>{TEXT.address}</label>
              <input
                type="text"
                value={userInfo.address}
                onChange={handleInputChange("address")}
                placeholder={TEXT.placeholder.address}
              />
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="icon-buttons-grid">
            {[
              { name: "Chat", route: "/chat", img: "chat.png" },
              { name: "Bookmark", route: "/user/bookmark", icon: <FaRegBookmark size={48} /> },
              { name: "Favorites", route: "/user/favorites", img: "favorites.png" },
              { name: "Files", route: "/user/files", img: "files.png" },
              { name: "Rehome", route: "/rehome/list", img: "rehome.png" },
              { name: "Donate", route: "/about", img: "donate.png" },
            ].map(({ name, route, img, icon }) => (
              <div className="icon-item" key={name} onClick={() => navigate(route)}>
                {icon ? (
                  icon
                ) : (
                  <img src={`/HopeTail-FE/images/${img}`} alt={name} />
                )}
                <span>{TEXT.buttons[name]}</span>
              </div>
            ))}
          </div>

          <div className="about-wrapper">
            <textarea
              placeholder={TEXT.about}
              value={userInfo.about}
              onChange={handleInputChange("about")}
            />
            <div className="change-button-wrapper">
              <button className="change-button" onClick={handleChange}>
                {TEXT.change}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;