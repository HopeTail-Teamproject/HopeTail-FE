import React, { useState, useEffect } from 'react';
import './CommunityPost.css';
import LeftSidebar from '../../components/common/leftSidebar/LeftSidebar';
import { useLanguage } from "../../context/language/LanguageContext";
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaThumbsUp, FaRegThumbsUp, FaRegBookmark, FaBookmark,
  FaShareAlt, FaExclamationTriangle,
  FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight
} from 'react-icons/fa';
import {
  getPostById,
  likePost,
  deletePost,
} from "../../lib/communityPost";

import {
  getComments,
  createComment,
  deleteComment,
} from "../../lib/comment";

const CommunityPost = () => {
  const { language } = useLanguage();
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPostById(postId)
      .then((data) => {
        setPost({
          ...data,
          username: data.username || 'user',
          images: [
            '/HopeTail-FE/images/image.png',
            '/HopeTail-FE/images/image.png',
            '/HopeTail-FE/images/image.png',
          ]
        });
        setLikes(data.likeCount || 0);
        setBookmarked(data.isBookmarked || false);
      })
      .catch((err) => console.error(err));

    getComments(postId)
      .then(setComments)
      .catch((err) => console.error(err));
  }, [postId]);

  const handleLike = () => {
    likePost(postId)
      .then(() => {
        const newLiked = !liked;
        setLiked(newLiked);
        setLikes((prev) => newLiked ? prev + 1 : prev - 1);
      })
      .catch((err) => console.error(err));
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

  const handleCommentSubmit = (e) => {
    if (e.key === 'Enter' && commentInput.trim()) {
      createComment(postId, commentInput)
        .then((newComment) => {
          setComments((prev) => [...prev, newComment]);
          setCommentInput('');
        })
        .catch((err) => console.error(err));
    }
  };

  const handleDeleteComment = (commentId) => {
    const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');
    if (!confirmDelete) return;
    deleteComment(commentId)
      .then(() => {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      })
      .catch((err) => console.error(err));
  };

  const handleDeletePost = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    deletePost(postId)
      .then(() => {
        alert('삭제되었습니다.');
        navigate('/community');
      })
      .catch((err) => console.error(err));
  };

  if (!post) return <div>Post not found</div>;

  return (
    <div className="post-wrapper">
      <div className="post-body">
        <LeftSidebar />
        <div className="post-center">
          <main className="post-main">
            <h2 className="post-title">Community</h2>
            <div className="post-title-underline" />

            <div className="title-wrapper">
              <input
                type="text"
                className="post-input-title"
                value={post.title}
                readOnly
              />
            </div>

            <div className="post-images">
              {post.images.map((src, idx) => (
                <img key={idx} src={src} alt={`post${idx}`} className="post-img" />
              ))}
            </div>

            <textarea
              className="post-content"
              value={post.content}
              readOnly
            />

            <div className="post-user-bar">
              <div
                className="user-wrapper"
                onClick={() => navigate(`/user/profile/${post.username}`)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src="/HopeTail-FE/images/user.png"
                  alt="user"
                  className="user-icon"
                />
                <div className="user-info">
                  <div className="username">{post.username}</div>
                  <div className="email">{post.email}</div>
                </div>
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
                <button className="delete-post-btn" onClick={handleDeletePost}>삭제</button>
              </div>
            </div>

            <div className="comment-box">
              <input
                type="text"
                placeholder="Write your comment | Press Enter to send your comment."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={handleCommentSubmit}
              />
            </div>

            <div className="comment-list">
              {comments.map((c, i) => (
                <div key={i} className="comment-row">
                  <img
                    src="/HopeTail-FE/images/user.png"
                    alt="comment-user"
                    className="comment-user-icon"
                  />
                  <div
                    className="comment-username"
                    onClick={() => navigate(`/user/profile/${c.email}`)}
                    style={{ cursor: 'pointer', fontWeight: 'bold', color: '#6a4cfa' }}
                  >
                    {c.email}
                  </div>
                  <div className="comment-text">{c.content}</div>
                  <button className="delete-comment" onClick={() => handleDeleteComment(c.id)}>삭제</button>
                </div>
              ))}
            </div>

            <div className="pagination">
              <button className="page-btn" disabled><FaAngleDoubleLeft /></button>
              <button className="page-btn" disabled><FaAngleLeft /></button>
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} className={`page-btn ${n === 1 ? 'active' : ''}`}>{n}</button>
              ))}
              <button className="page-btn"><FaAngleRight /></button>
              <button className="page-btn"><FaAngleDoubleRight /></button>
            </div>
          </main>

          <div className="post-ads">
            <img src="/HopeTail-FE/images/AD.png" alt="ad" className="ad-img" />
            <img src="/HopeTail-FE/images/AD.png" alt="ad" className="ad-img" />
            <img src="/HopeTail-FE/images/AD.png" alt="ad" className="ad-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;
