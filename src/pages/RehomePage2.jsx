import React, { useState } from "react";
import Navbar from "../components/common/navbar/Navbar";
import Footer from "../components/common/footer/Footer"
import AdoptCard from "../components/common/AdoptCard";
import { useFavorites } from "../context/FavoritesContext";
import { useLanguage } from "../context/language/LanguageContext";
import "./RehomePage2.css";

const RehomePage2 = () => {
  const { language } = useLanguage();
  const { favorites } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(favorites.length / 16);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedFavorites = favorites.slice(
    (currentPage - 1) * 16,
    currentPage * 16
  );

  return (
    <div className="page-container">
      <Navbar />
      <div className="rehome2-wrapper">
        <h1 className="rehome2-title">Rehome</h1>

        <div className="card-grid">
          {paginatedFavorites.map((pet) => (
            <AdoptCard key={pet.id} pet={pet} />
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
      <Footer />
    </div>
  );
};

export default RehomePage2;
