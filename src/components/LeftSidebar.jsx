import React from "react";
import { useNavigate } from "react-router-dom";
import "./LeftSidebar.css";

import logo from "../assets/logo.png";
import userPic from "../assets/user.png";
import userProfileIcon from "../assets/userprofile.png";
import chat from "../assets/chat.png";
import rehome from "../assets/rehome.png";
import bookmark from "../assets/bookmark.png";
import files from "../assets/files.png";
import donate from "../assets/donate.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLocationDot,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const LeftSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="left-sidebar">
      <img src={logo} alt="Logo" className="sidebar-logo" />
      <img src={userPic} alt="User" className="sidebar-profile" />

      <div className="sidebar-info">
        <p><FontAwesomeIcon icon={faUser} /> Hope Tail</p>
        <p><FontAwesomeIcon icon={faEnvelope} /> hopetail1234@gmail.com</p>
        <p><FontAwesomeIcon icon={faLocationDot} /> 47, Hanyangdaehak 1-gil,<br />Sangnok-gu, Ansan-si, Gyeonggi-do</p>
      </div>

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

      <div className="sidebar-actions">
        <p><FontAwesomeIcon icon={faUser} /> Profile</p>
        <p><FontAwesomeIcon icon={faRightFromBracket} /> Sign out</p>
      </div>
    </div>
  );
};

export default LeftSidebar;
