import React, { useState } from "react";
import "./CommunityCard.css";
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

const CommunityCard = ({ post, isBookmarked = false, onBookmarkClick, onClick }) => {
  const {
    imageUrl = "/HopeTail-FE/images/image.png",
    title = "title",
    content = "",
    username = "User name",
    createdAt = "2025/03/26",
    likeCount: initialLikes = 0,
    category = "Tips",
    profileImage = "/HopeTail-FE/images/profile_circle.png",
  } = post;

  const firstSentence = typeof content === "string" ? content.split("\n")[0] : "";

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    if (onBookmarkClick) onBookmarkClick(post.id);
  };

  return (
    <div className="community-card" onClick={onClick}>
      <div className="card-image-container">
        <img src={imageUrl} alt="thumbnail" className="card-image" />
        <div className="bookmark-icon" onClick={handleBookmarkClick}>
          {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </div>
      </div>

      <div className="card-text">
        <div className="card-title-row">
          <div className="card-title">{title}</div>
          <div className="tag-label">{category}</div>
        </div>

        <div className="card-subtitle-row">
          <div className="card-subtitle">{firstSentence}</div>
          <div className="like-box" onClick={toggleLike}>
            {liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
            <span>{likeCount}</span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="user-info">
          <img
            src={profileImage && profileImage !== "" ? profileImage : "/images/default_img.png"}
            alt="profile"
            className="profile-thumbnail"
            onError={(e) => {
              if (!e.target.src.includes("default_img.png")) {
                e.target.src = "/images/default_img.png";
              }
            }}
          />
          <span className="user-name">{username}</span>
        </div>
        <div className="post-date">{createdAt}</div>
      </div>
    </div>
  );
};

export default CommunityCard;
