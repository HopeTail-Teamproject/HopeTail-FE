import React, { useState, useEffect } from "react";
import "./CommunityPage.css";
import CommunityCard from "../../components/common/communityCard/CommunityCard";
import LeftSidebar from "../../components/common/leftSidebar/LeftSidebar";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/language/LanguageContext";
import communityPageText from "../../lib/i18n/communityPage";
import { communityPosts } from "../../lib/mock/communityData";

const CommunityPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = communityPageText[language] || communityPageText["en"];

  const [posts, setPosts] = useState([]);
  const [bookmarkIds, setBookmarkIds] = useState(() => {
    return JSON.parse(localStorage.getItem("bookmarks")) || [];
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const formattedPosts = communityPosts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      likeCount: post.stats.likes,
      createdAt: post.createdAt,
      email: post.author.email,
      category: post.category,
      thumbnailUrl: post.thumbnailUrl,
      username: post.author.name,
    }));

    const filtered =
      selectedCategory && selectedCategory !== "ALL"
        ? formattedPosts.filter((d) => d.category === selectedCategory)
        : formattedPosts;

    setPosts(filtered);
  }, [selectedCategory]);

  const handleBookmarkToggle = (postId) => {
    const updated = bookmarkIds.includes(postId)
      ? bookmarkIds.filter((id) => id !== postId)
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
                  onClick={() => navigate("/community/guideline")}
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
                onClick={() => navigate("/community/new")}
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
                  className={`page-btn circle ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
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
