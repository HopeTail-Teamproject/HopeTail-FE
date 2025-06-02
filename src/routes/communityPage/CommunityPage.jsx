import React, { useState, useEffect } from 'react';
import './CommunityPage.css';
import CommunityCard from '../../components/common/communityCard/CommunityCard';
import LeftSidebar from '../../components/common/leftSidebar/LeftSidebar';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/language/LanguageContext';
import communityPageText from '../../lib/i18n/communityPage';

const CommunityPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = communityPageText[language] || communityPageText["en"];

  const [posts, setPosts] = useState([]);
  const [bookmarkIds, setBookmarkIds] = useState(() => {
    return JSON.parse(localStorage.getItem("bookmarks")) || [];
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const dummy = [
      {
        id: 1,
        title: "Adopting Tips!",
        content: "Adopting a pet is a beautiful journey.",
        likeCount: 5,
        createdAt: "2025-05-23",
        email: "warmday@tail.com",
        category: "REVIEW",
      },
      {
        id: 2,
        title: "My Dog's First Day",
        content: "It was chaotic but amazing!",
        likeCount: 8,
        createdAt: "2025-05-22",
        email: "doglover@puppy.com",
        category: "DIARY",
      },
      {
        id: 3,
        title: "Healing Through Adoption",
        content: "Saving them saved me.",
        likeCount: 12,
        createdAt: "2025-05-21",
        email: "hope@tail.com",
        category: "REVIEW",
      },
      {
        id: 4,
        title: "Training Journey",
        content: "How I trained my rescue dog in 30 days.",
        likeCount: 6,
        createdAt: "2025-05-20",
        email: "trainer@dogs.com",
        category: "DIARY",
      },
      {
        id: 5,
        title: "First Vet Visit",
        content: "Our puppy was so brave!",
        likeCount: 4,
        createdAt: "2025-05-19",
        email: "vet@care.com",
        category: "REVIEW",
      },
      {
        id: 6,
        title: "Daily Walk Routine",
        content: "Best routes for city dogs.",
        likeCount: 3,
        createdAt: "2025-05-18",
        email: "walker@tail.com",
        category: "DIARY",
      },
      {
        id: 7,
        title: "Favorite Dog Parks",
        content: "A review of top parks in Seoul.",
        likeCount: 10,
        createdAt: "2025-05-17",
        email: "park@guide.com",
        category: "REVIEW",
      },
      {
        id: 8,
        title: "Overcoming Fear",
        content: "Our shy dog found confidence.",
        likeCount: 7,
        createdAt: "2025-05-16",
        email: "rescue@home.com",
        category: "DIARY",
      },
      {
        id: 9,
        title: "Grooming Day!",
        content: "Our dog looks so fresh and clean.",
        likeCount: 2,
        createdAt: "2025-05-15",
        email: "groomer@shine.com",
        category: "REVIEW",
      },
    ].map(post => ({
      ...post,
      username: post.email.split('@')[0],
    }));

    const filtered = selectedCategory && selectedCategory !== 'ALL'
      ? dummy.filter((d) => d.category === selectedCategory)
      : dummy;

    setPosts(filtered);
  }, [selectedCategory]);

  const handleBookmarkToggle = (postId) => {
    const updated = bookmarkIds.includes(postId)
      ? bookmarkIds.filter(id => id !== postId)
      : [...bookmarkIds, postId];
    localStorage.setItem("bookmarks", JSON.stringify(updated));
    setBookmarkIds(updated);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
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
            <h2 className="community-title">{text.title}</h2>
            <div className="community-title-underline"></div>
          </div>

          <div className="community-content-box">
            <div className="notice-row">
              <span className="notice-label">Notice</span>
              <span className="notice-text">
                {text.notice}
                <span
                  className="guideline-link"
                  onClick={() => navigate('/community/guideline')}
                >
                  {text.guideline}
                </span>
              </span>
            </div>

            <div className="toolbar-row">
              <div className="category-block">
                <span className="category-label">{text.categoryLabel}</span>
                <select
                  className="category-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="ALL">{text.categoryAll}</option>
                  <option value="REVIEW">{text.categoryReview}</option>
                  <option value="DIARY">{text.categoryDiary}</option>
                </select>
              </div>

              <button
                className="new-post-button"
                onClick={() => navigate('/community/new')}
              >
                {text.newPost}
              </button>
            </div>

            <div className="card-grid">
              {paginatedPosts.map((post) => (
                <CommunityCard
                  key={post.id}
                  post={post}
                  isBookmarked={bookmarkIds.includes(post.id)}
                  onBookmarkClick={() => handleBookmarkToggle(post.id)}
                  onClick={() => navigate(`/community/${post.id}`)}
                />
              ))}
            </div>

            <div className="pagination">
              <button className="page-btn circle" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>≪</button>
              <button className="page-btn circle" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>＜</button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`page-btn circle ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button className="page-btn circle" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>＞</button>
              <button className="page-btn circle" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>≫</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommunityPage;
