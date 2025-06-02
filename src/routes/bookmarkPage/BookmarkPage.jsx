import React, { useEffect, useState } from "react";
import CommunityCard from "../../components/common/communityCard/CommunityCard";
import { useLanguage } from "../../context/language/LanguageContext";
import bookmarkPageText from "../../lib/i18n/bookmarkPage";
import "./BookmarkPage.css";

const BookmarkPage = () => {
  const { language } = useLanguage();
  const text = bookmarkPageText[language] || bookmarkPageText["en"];

  const [allPosts, setAllPosts] = useState([]);
  const [bookmarkIds, setBookmarkIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarkIds(storedBookmarks);

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
    ].map(post => ({
      ...post,
      username: post.email.split("@")[0],
    }));

    const filtered = dummy.filter((post) => storedBookmarks.includes(post.id));
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

    setAllPosts((prev) =>
      prev.filter((post) => updatedBookmarks.includes(post.id))
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
        <h2 className="bookmark-title">{text.title}</h2>
        <div className="bookmark-title-underline" />

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
