import React, { useEffect, useState } from "react";
import CommunityCard from "../../components/common/communityCard/CommunityCard";
import { useLanguage } from "../../context/language/LanguageContext";
import bookmarkPageText from "../../lib/i18n/bookmarkPage";
import { communityPosts } from "../../lib/mock/communityData";
import { useNavigate } from "react-router-dom";
import "./BookmarkPage.css";

const BookmarkPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = bookmarkPageText[language] || bookmarkPageText["en"];

  const [allPosts, setAllPosts] = useState([]);
  const [bookmarkIds, setBookmarkIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarkIds(storedBookmarks);

    const filtered = communityPosts.filter((post) => storedBookmarks.includes(post.id));
    setAllPosts(filtered);
  }, []);

  const handleBookmarkToggle = (postId) => {
    let updatedBookmarks;
    if (bookmarkIds.includes(postId)) {
      updatedBookmarks = bookmarkIds.filter((id) => id !== postId);
    } else {
      updatedBookmarks = [...bookmarkIds, postId];
    }

    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    setBookmarkIds(updatedBookmarks);

    setAllPosts((prev) => prev.filter((post) => updatedBookmarks.includes(post.id)));
  };

  const totalPages = Math.ceil(allPosts.length / itemsPerPage);
  const paginatedPosts = allPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bookmark-page">
      <div className="bookmark-content">
        <h2 className="bookmark-title">{text.title}</h2>
        <div className="bookmark-title-underline" />

        <div className="bookmark-box">
          <div className="bookmark-card-list">
            {paginatedPosts.map((post) => (
              <CommunityCard
                key={post.id}
                post={{
                  ...post,
                  username: post.author.name,
                  email: post.author.email,
                  likeCount: post.stats.likes,
                }}
                isBookmarked={bookmarkIds.includes(post.id)}
                onBookmarkClick={() => handleBookmarkToggle(post.id)}
                onClick={() => navigate(`/community/${post.id}`)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="bookmark-pagination-wrapper">
              <button
                className="bookmark-nav-button"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {text.before}
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
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {text.next}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkPage;
