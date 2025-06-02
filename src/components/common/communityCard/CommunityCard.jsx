import React, { useState, useEffect } from "react";
import "./CommunityCard.css";
import { FaThumbsUp, FaRegThumbsUp, FaBookmark, FaRegBookmark } from "react-icons/fa";

const CommunityCard = ({
  post,
  isBookmarked = false,
  onBookmarkClick,
  onClick,
  onLikeClick,
}) => {
  const {
    id,
    title = "title",
    content = "",
    category = "STORY",
    createdAt = "2025-03-26",
    username = "anonymous",
    likeCount = 0,
    thumbnailUrl,
  } = post;

  const firstSentence = typeof content === "string" ? content.split("\n")[0] : "";

  const [liked, setLiked] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    if (likedPosts.includes(id)) {
      setLiked(true);
    }
  }, [id]);

  const toggleLike = (e) => {
    e.stopPropagation();
    const newLiked = !liked;
    setLiked(newLiked);
    setLocalLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));

    let likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    if (newLiked) {
      likedPosts.push(id);
    } else {
      likedPosts = likedPosts.filter((postId) => postId !== id);
    }
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

    if (onLikeClick) onLikeClick(id);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    if (onBookmarkClick) onBookmarkClick(id);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    setImageError(true);
    e.target.src = "/HopeTail-FE/images/default_img.png";
  };

  return (
    <div className="community-card" onClick={onClick}>
      <div className="card-image-container">
        <img
          src={
            !imageError && thumbnailUrl
              ? thumbnailUrl
              : "/HopeTail-FE/images/default_img.png"
          }
          alt="thumbnail"
          className="card-image"
          onError={handleImageError}
        />
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
            {liked ? <FaThumbsUp className="liked-icon" /> : <FaRegThumbsUp />}
            <span>{localLikeCount}</span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="user-info">
          <img
            src="/HopeTail-FE/images/user.png"
            alt="profile"
            className="profile-thumbnail"
            onError={(e) => {
              if (!e.target.src.includes("user.png")) {
                e.target.src = "/HopeTail-FE/images/user.png";
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
