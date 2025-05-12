import React, { useState, useEffect } from "react";
import AdoptCard from "../../components/common/AdoptCard";
import { useLanguage } from "../../context/language/LanguageContext";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const { language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [favoritedPets, setFavoritedPets] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoritedPets(storedFavorites);
  }, []);

  const totalPages = Math.ceil(favoritedPets.length / 16);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedFavorites = favoritedPets.slice(
    (currentPage - 1) * 16,
    currentPage * 16
  );

  return (
    <div className="favorites-page">
      <div className="favorites-content">
        <h2 className="favorites-title">Favorites</h2>

        <div className="favorites-card-list">
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
    </div>
  );
};

export default FavoritesPage;
