import React from "react";
import { useNavigate } from "react-router-dom";
import "./LeftSidebar.css";

import logo from "../../../assets/logo.png";
import defaultUserPic from "../../../assets/user.png";
import userProfileIcon from "../../../assets/userprofile.png";
import chat from "../../../assets/chat.png";
import rehome from "../../../assets/rehome.png";
import bookmark from "../../../assets/bookmark.png";
import files from "../../../assets/files.png";
import donate from "../../../assets/donate.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLocationDot,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const LeftSidebar = () => {
  const navigate = useNavigate();

  // ✅ localStorage에서 유저 정보 불러오기
  const userPhoto = localStorage.getItem("userPhoto");
  const userName = localStorage.getItem("userName") || "Hope Tail";
  const userEmail = localStorage.getItem("userEmail") || "hopetail1234@gmail.com";
  const userAddress =
    localStorage.getItem("userAddress") ||
    "47, Hanyangdaehak 1-gil,\nSangnok-gu, Ansan-si, Gyeonggi-do";

  return (
    <div className="left-sidebar">
      <img src={logo} alt="Logo" className="sidebar-logo" />

      {/* ✅ 등록된 사진 불러오기, 없으면 기본 사진 */}
      <img
        src={userPhoto || defaultUserPic}
        alt="User"
        className="sidebar-profile"
      />

      {/* ✅ 사용자 정보 */}
      <div className="sidebar-info">
        <p><FontAwesomeIcon icon={faUser} /> {userName}</p>
        <p><FontAwesomeIcon icon={faEnvelope} /> {userEmail}</p>
        <p><FontAwesomeIcon icon={faLocationDot} /> {userAddress}</p>
      </div>

      {/* 기능 아이콘들 */}
      <div className="sidebar-icons">
        <img
          src={userProfileIcon}
          alt="Profile"
          title="Profile"
          onClick={() => navigate("/user")}
        />
        <img
          src={chat}
          alt="Chat"
          title="Chat"
          onClick={() => navigate("/chatpage")}
        />
        <img
          src={rehome}
          alt="Rehome"
          title="Adopt/Rehome"
          onClick={() => navigate("/rehome2")}
        />
        <img
          src={bookmark}
          alt="Bookmark"
          title="Bookmarks"
          onClick={() => navigate("/bookmark")}
        />
        <img
          src={files}
          alt="Files"
          title="Posts"
          onClick={() => navigate("/files")}
        />
        <img
          src={donate}
          alt="Donate"
          title="Donate"
          onClick={() => navigate("/about")}
        />
      </div>

      <hr />

      {/* ✅ 하단 메뉴 */}
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
