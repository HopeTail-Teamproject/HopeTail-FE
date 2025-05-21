import React, { useState, useEffect } from 'react';
import './CommunityPage.css';
import CommunityCard from '../../components/common/communityCard/CommunityCard';
import LeftSidebar from '../../components/common/leftSidebar/LeftSidebar';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/language/LanguageContext';
import {
  fetchAllPosts,
  fetchPostsByCategory,
  fetchPostById,
  likePost,
} from '../../lib/community';

const CommunityPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data =
          selectedCategory === '' || selectedCategory === 'ALL'
            ? await fetchAllPosts()
            : await fetchPostsByCategory(selectedCategory);
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadPosts();
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleLikeClick = async (postId) => {
    try {
      await likePost(postId);
      const updatedPost = await fetchPostById(postId);
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === postId ? updatedPost : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="community-wrapper">
      <div className="community-body">
        <LeftSidebar />
        <main className="community-main">
          <div className="community-header">
            <h2 className="community-title">Community</h2>
            <div className="community-title-underline"></div>
          </div>

          <div className="community-content-box">
            <div className="notice-row">
              <span className="notice-label">Notice</span>
              <span className="notice-text">
                Thank you for visiting our community. Please read the{' '}
                <span
                  className="guideline-link"
                  onClick={() => navigate('/community/guideline')}
                >
                  guidelines
                </span>.
              </span>
            </div>

            <div className="toolbar-row">
              <div className="category-block">
                <span className="category-label">Category</span>
                <select
                  className="category-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">All</option>
                  <option value="REVIEW">Review</option>
                  <option value="DIARY">Diary</option>
                </select>
              </div>

              <button
                className="new-post-button"
                onClick={() => navigate('/community/new')}
              >
                New Post
              </button>
            </div>

            <div className="card-grid">
              {paginatedPosts.map((post) => (
                <CommunityCard
                  key={post.id}
                  post={post}
                  onClick={() => navigate(`/community/${post.id}`)}
                  onLikeClick={() => handleLikeClick(post.id)}
                />
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

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`page-btn circle ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
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
        </main>
      </div>
    </div>
  );
};

export default CommunityPage;
