import React, { useState, useEffect } from "react";
import LeftSidebar from "../../components/common/leftSidebar/LeftSidebar";
import { useLanguage } from "../../context/language/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp as faThumbsUpRegular,
  faBookmark as faBookmarkRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faShareNodes, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import communityPostText from "../../lib/i18n/communityPost";
import { useParams } from "react-router-dom";
import { communityPosts, communityComments } from "../../lib/mock/communityData";
import "./CommunityPost.css";

const CommunityPost = () => {
  const { postId } = useParams();
  const { language } = useLanguage();
  const text = communityPostText[language] || communityPostText["en"];

  const [comment, setComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const totalPages = 3;

  const post = communityPosts.find((p) => p.id === Number(postId));
  const comments = communityComments.filter((c) => c.postId === Number(postId));

  useEffect(() => {
    if (post) {
      setLikesCount(post.stats.likes);
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
      if (likedPosts.includes(post.id)) {
        setLiked(true);
      }
    }
  }, [post]);

  const handleLikeClick = () => {
    if (!post) return;

    const newLiked = !liked;
    setLiked(newLiked);
    setLikesCount((prev) => (newLiked ? prev + 1 : prev - 1));

    let likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    if (newLiked) {
      likedPosts.push(post.id);
    } else {
      likedPosts = likedPosts.filter((id) => id !== post.id);
    }
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  };

  const handleCommentKeyPress = (e) => {
    if (e.key === "Enter" && comment.trim()) {
      setComment("");
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (!post) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="community-post-page">
      <LeftSidebar />

      <div className="community-post-main">
        <div className="community-title">{text.title}</div>
        <div className="community-title-underline" />

        <div className="post-container">
          <input type="text" className="post-title-input" value={post.title} readOnly />

          <div className="post-images-row">
            {post.images.map((src, idx) => (
              <div key={idx} className="post-image-box">
                <img
                  src={src}
                  alt={`post-img-${idx}`}
                  className="post-image"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>

          <textarea className="post-content-textarea" value={post.content} readOnly />

          <div className="post-user-container">
            <div className="post-user-box">
              <div className="user-info-box">
                <img
                  src={post.author.avatar}
                  alt="author-avatar"
                  className="user-avatar"
                />
                <div className="user-info">
                  <div className="user-name">{post.author.name}</div>
                  <div className="user-email">{post.author.email}</div>
                </div>
              </div>
            </div>

            <div className="action-buttons-box right-align">
              <div className="action-buttons">
                <div className="action" onClick={handleLikeClick}>
                  <FontAwesomeIcon
                    icon={faThumbsUpRegular}
                    className={`icon ${liked ? "liked" : ""}`}
                  />
                  <span className="action-label">{likesCount}</span>
                </div>
                <div className="action">
                  <FontAwesomeIcon icon={faBookmarkRegular} className="icon" />
                </div>
                <div className="action">
                  <FontAwesomeIcon icon={faShareNodes} className="icon" />
                </div>
                <div className="action">
                  <FontAwesomeIcon icon={faTriangleExclamation} className="icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="comment-section">
          <textarea
            className="comment-input"
            placeholder={text.commentPlaceholder}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={handleCommentKeyPress}
          />

          <div className="comment-list-table">
            {comments.map((c) => (
              <div key={c.id} className="comment-row">
                <div className="comment-user">
                  <img src={c.avatar} alt="comment-avatar" />
                  <span>{c.author}</span>
                </div>
                <div className="comment-text">{c.text}</div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              className="page-btn circle"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              ≪
            </button>
            <button
              className="page-btn circle"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ＜
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`page-btn circle ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="page-btn circle"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              ＞
            </button>
            <button
              className="page-btn circle"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              ≫
            </button>
          </div>
        </div>
      </div>

      <div className="post-ads">
        <img className="ad-box" src="/HopeTail-FE/images/AD.png" alt="AD1" />
        <img className="ad-box" src="/HopeTail-FE/images/AD.png" alt="AD2" />
        <img className="ad-box" src="/HopeTail-FE/images/AD.png" alt="AD3" />
      </div>
    </div>
  );
};

export default CommunityPost;
