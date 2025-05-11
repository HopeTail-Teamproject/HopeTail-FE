import React, { useState } from "react";
import CommunityCard from "../../components/common/communityCard/CommunityCard";
import { useLanguage } from "../../context/language/LanguageContext";
import "./BookmarkPage.css";

const BookmarkPage = () => {
  const { language } = useLanguage();

  const allPosts = [
    { id: 1, title: "A", isBookmarked: true },
    { id: 2, title: "B", isBookmarked: false },
    { id: 3, title: "C", isBookmarked: true },
    { id: 4, title: "D", isBookmarked: true },
    { id: 5, title: "E", isBookmarked: true },
  ];

  const bookmarkedPosts = allPosts.filter((post) => post.isBookmarked);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(bookmarkedPosts.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedPosts = bookmarkedPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="bookmark-page">
      <div className="bookmark-content">
        <h2 className="bookmark-title">Bookmark</h2>

        <div className="bookmark-card-list">
          {paginatedPosts.map((post) => (
            <CommunityCard key={post.id} {...post} />
          ))}
        </div>

        <div className="bookmark-pagination-wrapper">
          <button
            className="bookmark-nav-button"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Before
          </button>

          <div className="dot-indicators">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                className={`dot ${currentPage === i + 1 ? "active" : ""}`}
              />
            ))}
          </div>

          <button
            className="bookmark-nav-button"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkPage;
