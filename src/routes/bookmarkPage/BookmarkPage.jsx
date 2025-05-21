import React, { useEffect, useState } from "react";
import CommunityCard from "../../components/common/communityCard/CommunityCard";
import { useLanguage } from "../../context/language/LanguageContext";
import { fetchAllPosts } from "../../lib/community.js";
import "./BookmarkPage.css";

const BookmarkPage = () => {
  const { language } = useLanguage();
  const [allPosts, setAllPosts] = useState([]);
  const [bookmarkIds, setBookmarkIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarkIds(storedBookmarks);

    fetchAllPosts()
      .then((posts) => {
        const filtered = posts.filter((post) => storedBookmarks.includes(post.id));
        setAllPosts(filtered);
      })
      .catch((err) => console.error(err));
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

    setAllPosts((prev) =>
      prev.filter((post) =>
        updatedBookmarks.includes(post.id)
      )
    );
  };

  const totalPages = Math.ceil(allPosts.length / itemsPerPage);
  const paginatedPosts = allPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bookmark-page">
      <div className="bookmark-content">
        <h2 className="bookmark-title">
          {language === "en" ? "Bookmark" : "북마크"}
        </h2>

        <div className="bookmark-box">
          <div className="bookmark-card-list">
            {paginatedPosts.map((post) => (
              <CommunityCard
                key={post.id}
                post={post}
                isBookmarked={bookmarkIds.includes(post.id)}
                onBookmarkClick={() => handleBookmarkToggle(post.id)}
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
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkPage;
