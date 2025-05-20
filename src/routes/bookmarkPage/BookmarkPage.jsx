import React, { useEffect, useState } from "react";
import CommunityCard from "../../components/common/communityCard/CommunityCard";
import { useLanguage } from "../../context/language/LanguageContext";
import "./BookmarkPage.css";

const BookmarkPage = () => {
  const { language } = useLanguage();
  const [allPosts, setAllPosts] = useState([]);
  const [bookmarkIds, setBookmarkIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    const mockData = [
      {
        id: 1,
        title: "강아지 산책 꿀팁",
        content: "산책은 언제, 어떻게 해야 좋을까요?",
        imageUrl: "/HopeTail-FE/images/image.png",
        username: "밍키맘",
        createdAt: "2025/03/26",
        likeCount: 20,
        category: "Tips",
        profileImage: "/HopeTail-FE/images/profile_circle.png"
      },
      {
        id: 2,
        title: "고양이 장난감 추천",
        content: "우리 고양이가 제일 좋아한 장난감은?",
        imageUrl: "/HopeTail-FE/images/image.png",
        username: "냥덕후",
        createdAt: "2025/03/26",
        likeCount: 35,
        category: "Tips",
        profileImage: "/HopeTail-FE/images/profile_circle.png"
      },
      {
        id: 3,
        title: "입양 전 체크리스트",
        content: "입양 전 꼭 확인해야 할 체크리스트를 소개합니다.",
        imageUrl: "/HopeTail-FE/images/image.png",
        username: "보호소직원",
        createdAt: "2025/03/26",
        likeCount: 12,
        category: "Tips",
        profileImage: "/HopeTail-FE/images/profile_circle.png"
      }
    ];

    setBookmarkIds(storedBookmarks);
    setAllPosts(mockData);
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
