import React, { useState } from 'react';
import '../pages/CommunityPost.css';
import Navbar from "../components/common/navbar/Navbar";
import Footer from "../components/common/footer/Footer";
import LeftSidebar from '../components/LeftSidebar';
import { useLanguage } from "../context/language/LanguageContext";
import adImage from '../assets/AD.png';
import image from '../assets/image.png';
import userImage from '../assets/user.png';
import {
  FaThumbsUp, FaRegThumbsUp, FaRegBookmark, FaBookmark,
  FaShareAlt, FaExclamationTriangle,
  FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight
} from 'react-icons/fa';

const CommunityPost = () => {
  const { language } = useLanguage();

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleReport = () => {
    if (window.confirm('Do you want to report this post?')) {
      alert('Post reported.');
    }
  };

  return (
    <div className="post-wrapper">
      <Navbar />
      <div className="post-body">
        <LeftSidebar />
        <main className="post-main">
          <h2 className="post-title">Community</h2>

          <input type="text" className="post-input-title" value="Title" readOnly />

          <div className="post-images">
            <img src={image} alt="post1" className="post-img" />
            <img src={image} alt="post2" className="post-img" />
            <img src={image} alt="post3" className="post-img" />
          </div>

          <textarea className="post-content" value="Content" readOnly />

          <div className="post-user-bar">
            <img src={userImage} alt="user" className="user-icon" />
            <div className="user-info">
              <div className="username">User_name</div>
              <div className="email">Email</div>
            </div>

            <div className="post-actions">
              <div className="icon-group" onClick={handleLike}>
                {liked ? <FaThumbsUp className="icon thumb" /> : <FaRegThumbsUp className="icon thumb" />}
                <span>{likes}</span>
              </div>
              <div onClick={handleBookmark}>
                {bookmarked ? <FaBookmark className="icon" /> : <FaRegBookmark className="icon" />}
              </div>
              <FaShareAlt className="icon" onClick={handleShare} />
              <FaExclamationTriangle className="icon" onClick={handleReport} />
            </div>
          </div>

          <div className="comment-box">
            <input type="text" placeholder="Write your comment | Press Enter to send your comment." />
          </div>

          <div className="comment-list">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="comment-row">
                <div className="comment-username">username</div>
                <div className="comment-text">comment</div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button className="page-btn" disabled><FaAngleDoubleLeft /></button>
            <button className="page-btn" disabled><FaAngleLeft /></button>
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <button key={n} className={`page-btn ${n === 1 ? 'active' : ''}`}>{n}</button>
            ))}
            <button className="page-btn"><FaAngleRight /></button>
            <button className="page-btn"><FaAngleDoubleRight /></button>
          </div>
        </main>

        <div className="post-ads">
          <img src={adImage} alt="ad" className="ad-img" />
          <img src={adImage} alt="ad" className="ad-img" />
          <img src={adImage} alt="ad" className="ad-img" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CommunityPost;
