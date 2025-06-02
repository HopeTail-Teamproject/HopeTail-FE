import React, { useState, useEffect } from "react";
import "./UserPage.css";
import { useLanguage } from "../../context/language/LanguageContext";
import { getUserInfo } from "../../lib/user";
import strings from "../../lib/i18n/userPage";

const UserPage = () => {
  const { language } = useLanguage();
  const TEXT = strings[language];

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    getUserInfo()
      .then((data) => {
        if (!data) return;
        setUserInfo({
          username: data.username || "",
          email: data.email || "",
          phone: data.phoneNumber || "",
          address: data.address || "",
        });
      })
      .catch((err) => {
        console.error("유저 정보 로딩 실패:", err);
      });
  }, []);

  const handleInputChange = (field) => (e) => {
    setUserInfo({ ...userInfo, [field]: e.target.value });
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

            <div className="input-group wide">
              <label>{TEXT.email}</label>
              <input
                type="email"
                value={userInfo.email}
                onChange={handleInputChange("email")}
                placeholder={TEXT.placeholder.email}
              />
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
      </div>
    </div>
  );
};

export default UserPage;