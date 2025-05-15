import React, { useState } from "react";
import CommunityCard from "../../components/common/communityCard/CommunityCard";
import { useLanguage } from "../../context/language/LanguageContext";
import "./BookmarkPage.css";

const BookmarkPage = () => {
  const { language } = useLanguage();

  const allPosts = [
    {
      id: 1,
      title: "Dog Nutrition Tips",
      imageUrl: "/images/image1.png",
      firstSentence: "Feed your dog twice a day...",
      username: "Alice",
      date: "2025/03/26",
      initialLikes: 3,
      isBookmarked: true,
    },
    {
      id: 2,
      title: "Cat Grooming Guide",
      imageUrl: "/images/image2.png",
      firstSentence: "Brush regularly to avoid shedding...",
      username: "Bob",
      date: "2025/03/27",
      initialLikes: 5,
      isBookmarked: true,
    },
    {
      id: 3,
      title: "Puppy Training 101",
      imageUrl: "/images/image3.png",
      firstSentence: "Start with basic commands...",
      username: "Charlie",
      date: "2025/03/28",
      initialLikes: 7,
      isBookmarked: true,
    },
    {
      id: 4,
      title: "How to Adopt a Rescue Dog",
      imageUrl: "/images/image4.png",
      firstSentence: "Rescue dogs need patience and love...",
      username: "Dana",
      date: "2025/03/29",
      initialLikes: 2,
      isBookmarked: true,
    },
    {
      id: 5,
      title: "Pet Safety at Home",
      imageUrl: "/images/image5.png",
      firstSentence: "Keep wires out of reach...",
      username: "Eve",
      date: "2025/03/30",
      initialLikes: 4,
      isBookmarked: true,
    }
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
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkPage;
