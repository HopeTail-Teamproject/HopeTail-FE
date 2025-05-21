import React, { useState } from "react";
import "./CommunityCard.css";
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

const CommunityCard = ({
  post,
  isBookmarked = false,
  onBookmarkClick,
  onClick,
  onLikeClick,
}) => {
  const {
    title = "title",
    content = "",
    category = "STORY",
    createdAt = "2025-03-26",
    email = "anonymous@user.com",
    likeCount = 0,
  } = post;

  const firstSentence = typeof content === "string" ? content.split("\n")[0] : "";
  const [liked, setLiked] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked((prev) => !prev);
    setLocalLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    if (onLikeClick) onLikeClick(post.id);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    if (onBookmarkClick) onBookmarkClick(post.id);
  };

  return (
    <div className="community-card" onClick={onClick}>
      <div className="card-image-container">
        <img src={"/HopeTail-FE/images/image.png"} alt="thumbnail" className="card-image" />
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
            <span>{localLikeCount}</span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="user-info">
          <img
            src="/images/default_img.png"
            alt="profile"
            className="profile-thumbnail"
            onError={(e) => {
              if (!e.target.src.includes("default_img.png")) {
                e.target.src = "/images/default_img.png";
              }
            }}
          />
          <span className="user-name">{email}</span>
        </div>
        <div className="post-date">{createdAt.slice(0, 10)}</div>
      </div>
    </div>
  );
};

export default CommunityCard;
