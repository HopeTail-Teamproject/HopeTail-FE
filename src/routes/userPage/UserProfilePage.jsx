import React, { useState, useEffect } from "react";
import "./UserProfilePage.css";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfo } from "../../lib/user";

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    about: "",
  });

  useEffect(() => {
    getUserInfo()
      .then((data) => {
        setUserInfo({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          about: data.about || "",
        });
      })
      .catch((err) => {
        console.error("유저 정보 로딩 실패:", err);
      });
  }, []);

  const handleChange = (field) => (e) => {
    setUserInfo({ ...userInfo, [field]: e.target.value });
  };

  return (
    <div className="userpage-wrapper">
      <div className="userpage-container">
        <div className="left-box">
          <div className="profile-box">
            <img
              src="/HopeTail-FE/images/user.png"
              alt="User Profile"
              onError={(e) => {
                if (!e.target.src.includes("default_img.png")) {
                  e.target.src = "/HopeTail-FE/images/default_img.png";
                }
              }}
            />
          </div>
          <div className="form-fields">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={userInfo.username}
                onChange={handleChange("username")}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={userInfo.email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group">
              <label>Phone number</label>
              <input
                type="text"
                value={userInfo.phone}
                onChange={handleChange("phone")}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={userInfo.address}
                onChange={handleChange("address")}
              />
            </div>
          </div>
        </div>

        <div className="right-box">
          <div className="about-section">
            <textarea
              className="about-box"
              placeholder="About User"
              value={userInfo.about}
              onChange={handleChange("about")}
            />
            <div className="action-buttons">
              <div className="action-btn" onClick={() => navigate("/chat")}>
                <img
                  src="/HopeTail-FE/images/chat.png"
                  alt="Chat"
                  width="48"
                  height="48"
                  onError={(e) => {
                    if (!e.target.src.includes("default_img.png")) {
                      e.target.src = "/HopeTail-FE/images/default_img.png";
                    }
                  }}
                />
                <span>Chat</span>
              </div>
              <div className="action-btn" onClick={() => navigate("/rehome/list")}>
                <img
                  src="/HopeTail-FE/images/rehome.png"
                  alt="Rehome"
                  width="48"
                  height="48"
                  onError={(e) => {
                    if (!e.target.src.includes("default_img.png")) {
                      e.target.src = "/HopeTail-FE/images/default_img.png";
                    }
                  }}
                />
                <span>Rehome</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
