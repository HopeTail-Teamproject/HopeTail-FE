import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LeftSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLocationDot,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { getUserInfo } from "../../../lib/user.js";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: "Hope Tail",
    email: "hopetail1234@gmail.com",
    address: "47, Hanyangdaehak 1-gil,\nSangnok-gu, Ansan-si, Gyeonggi-do",
    profileImage: "/HopeTail-FE/images/user.png",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("토큰 없음: 인증된 사용자 아님");
      return;
    }

    getUserInfo()
      .then((data) => {
        console.log("🎯 응답받은 유저 데이터:", data);

        if (!data) {
          console.warn("유저 데이터 없음");
          return;
        }

        setUserInfo({
          username: data.username ?? "Hope Tail",
          email: data.email ?? "hopetail1234@gmail.com",
          address:
            data.address ??
            "47, Hanyangdaehak 1-gil,\nSangnok-gu, Ansan-si, Gyeonggi-do",
          profileImage: data.profileImage ?? "/HopeTail-FE/images/user.png",
        });
      })
      .catch((err) => {
        console.error("유저 정보 로딩 실패:", err);
      });
  }, []);

  return (
    <div className="left-sidebar">
      <img
        src="/HopeTail-FE/images/logo.png"
        alt="Logo"
        className="sidebar-logo"
      />
      <img
        src={userInfo.profileImage}
        alt="User"
        className="sidebar-profile"
      />
      <div className="sidebar-info">
        <p>
          <FontAwesomeIcon icon={faUser} /> {userInfo.username}
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} /> {userInfo.email}
        </p>
        <p>
          <FontAwesomeIcon icon={faLocationDot} /> {userInfo.address}
        </p>
      </div>

      <div className="sidebar-icons">
        <img
          src="/HopeTail-FE/images/userprofile.png"
          alt="Profile"
          title="Profile"
          onClick={() => navigate("/user")}
        />
        <img
          src="/HopeTail-FE/images/bookmark.png"
          alt="Bookmark"
          title="Bookmarks"
          onClick={() => navigate("/user/bookmark")}
        />
        <img
          src="/HopeTail-FE/images/favorites.png"
          alt="Favorites"
          title="Favorites"
          onClick={() => navigate("/user/favorites")}
        />
      </div>

      <hr />

      <div className="sidebar-actions">
        <p onClick={() => navigate("/user")}>
          <FontAwesomeIcon icon={faUser} /> Profile
        </p>
        <p onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faRightFromBracket} /> Sign out
        </p>
      </div>
    </div>
  );
};

export default LeftSidebar;
