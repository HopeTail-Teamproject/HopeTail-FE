import React, { useState, useEffect } from "react";
import AdoptCard from "../../components/common/adoptCard/AdoptCard";
import Navbar from "../../components/common/navbar/Navbar";
import Footer from "../../components/common/footer/Footer";
import LeftSidebar from "../../components/common/leftSidebar/LeftSidebar";
import "./AdoptSelect.css";

const AdoptSelect = () => {
  const itemsPerPage = 16;
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/api/petposts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch pet list");
        return res.json();
      })
      .then((data) => {
        setPets(data);
      })
      .catch((err) => console.error("유기견 목록 불러오기 실패:", err));
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(pets.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  const handleFavorite = (pet) => {
    const exists = favorites.some((p) => p.id === pet.id);
    const updated = exists
      ? favorites.filter((p) => p.id !== pet.id)
      : [...favorites, pet];

    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  const paginatedPets = pets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(pets.length / itemsPerPage);

  return (
    <div className="adopt-select-wrapper">
      <Navbar />
      <div className="adopt-select-body">
        <LeftSidebar />
        <div className="adopt-select-container">
          <h2 className="adopt-title">Adopt</h2>
          <div className="adopt-title-underline"></div>

          <div className="adopt-card-box">
            <div className="adopt-card-grid">
              {paginatedPets.map((pet) => (
                <AdoptCard
                  key={pet.id}
                  pet={pet}
                  onFavorite={handleFavorite}
                  isFavorited={favorites.some((f) => f.id === pet.id)}
                />
              ))}
            </div>
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
      </div>
      <Footer />
    </div>
  );
};

export default AdoptSelect;
