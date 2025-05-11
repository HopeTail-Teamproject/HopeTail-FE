import React, { useState } from 'react';
import './CommunityCard.css';
import image from "../../../assets/image.png";
import { FaThumbsUp, FaRegThumbsUp, FaBookmark, FaRegBookmark } from 'react-icons/fa';


const CommunityCard = ({ onClick }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const toggleBookmark = (e) => {
    e.stopPropagation();
    setBookmarked((prev) => !prev);
  };

  return (
    <div className="community-card" onClick={onClick}>
      <div className="card-image-container">
        <img src={image} alt="thumbnail" className="card-image" />
        <div className="bookmark-icon" onClick={toggleBookmark}>
          {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </div>
      </div>

      <div className="card-text">
        <div className="card-title-row">
          <div className="card-title">title</div>
          <div className="tag-label">Tips</div>
        </div>

        <div className="card-subtitle-row">
          <div className="card-subtitle">first sentence</div>
          <div className="like-box" onClick={toggleLike}>
            {liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
            <span>{likeCount}</span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="user-info">
          <div className="profile-circle" />
          <span>User name</span>
        </div>
        <div className="post-date">2025/03/26</div>
      </div>
    </div>
  );
};

export default CommunityCard;
