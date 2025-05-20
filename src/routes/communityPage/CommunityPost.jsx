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
    const dummy = {
      id: postId,
      title: '임시 제목',
      content: '이것은 더미 게시글의 내용입니다.\n줄바꿈 테스트용입니다.',
      username: 'dog_lover99',
      email: 'dog@naver.com',
      userId: 1,
      likes: 5,
      isBookmarked: false,
      images: [
        '/HopeTail-FE/images/image.png',
        '/HopeTail-FE/images/image.png',
        '/HopeTail-FE/images/image.png'
      ]
    };

    setPost(dummy);
    setLikes(dummy.likes);
    setBookmarked(dummy.isBookmarked);

    setComments([
      { id: 1, username: 'user1', content: '너무 귀여워요!' },
      { id: 2, username: 'user2', content: '입양하고 싶어요~' }
    ]);
  }, [postId]);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes(prev => newLiked ? prev + 1 : prev - 1);
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
      const newComment = {
        id: comments.length + 1,
        username: 'you',
        content: commentInput
      };
      setComments([...comments, newComment]);
      setCommentInput('');
    }
  };

  const handleDeleteComment = (indexToDelete) => {
    const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');
    if (!confirmDelete) return;
    setComments(comments.filter((_, i) => i !== indexToDelete));
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
                    onClick={() => navigate(`/user/profile/${c.username}`)}
                    style={{ cursor: 'pointer', fontWeight: 'bold', color: '#6a4cfa' }}
                  >
                    {c.username}
                  </div>
                  <div className="comment-text">{c.content}</div>
                  <button className="delete-comment" onClick={() => handleDeleteComment(i)}>삭제</button>
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