import React, { useState } from 'react';
import './CommunityPage.css';
import CommunityCard from '../../components/common/communityCard/CommunityCard';
import LeftSidebar from '../../components/common/leftSidebar/LeftSidebar'; 
import Navbar from "../../components/common/navbar/Navbar";
import Footer from "../../components/common/footer/Footer";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "../../context/language/LanguageContext";

const CommunityPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const totalPages = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="community-wrapper">
      <Navbar />
      <div className="community-body">
        <LeftSidebar />
        <main className="community-main">
          <div className="community-header">
            <h2 className="community-title">Community</h2>
          </div>

          <div className="community-content-box">
            <div className="notice-row">
              <span className="notice-label">Notice</span>
              <span className="notice-text">
                Thank you for visiting our community. Please read the{' '}
                <span className="guideline-link" onClick={() => navigate('/community/guideline')}>
                  guidelines
                </span>.
              </span>
            </div>

            <div className="toolbar-row">
              <div className="category-block">
                <span className="category-label">Category</span>
                <select className="category-select">
                  <option>Title</option>
                  <option>Story</option>
                  <option>User name</option>
                </select>
              </div>

              <button className="new-post-button" onClick={() => navigate('/community/newpost')}>
                New Post
              </button>
            </div>

            <div className="card-grid">
              {[...Array(9)].map((_, index) => (
                <CommunityCard key={index} onClick={() => navigate('/community/post')} />
              ))}
            </div>

            <div className="pagination">
              <button className="page-btn circle" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                ≪
              </button>
              <button className="page-btn circle" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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

              <button className="page-btn circle" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                ＞
              </button>
              <button className="page-btn circle" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                ≫
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CommunityPage;
