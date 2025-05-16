import React, { useState } from 'react';
import './CommunityCard.css';
import { FaThumbsUp, FaRegThumbsUp, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const CommunityCard = ({
  imageUrl = "/images/image.png",
  title = "title",
  firstSentence = "first sentence",
  username = "User name",
  date = "2025/03/26",
  initialLikes = 0,
  isBookmarked = false,
  onClick
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [bookmarked, setBookmarked] = useState(isBookmarked);

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
        <img src={imageUrl} alt="thumbnail" className="card-image" />
        <div className="bookmark-icon" onClick={toggleBookmark}>
          {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </div>
      </div>

      <div className="card-text">
        <div className="card-title-row">
          <div className="card-title">{title}</div>
          <div className="tag-label">Tips</div>
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
          <div className="profile-circle" />
          <span>{username}</span>
        </div>
        <div className="post-date">{date}</div>
      </div>
    </div>
  );
};

export default CommunityCard;
