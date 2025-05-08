import React, { useState } from "react";
import AdoptCard from "../components/AdoptCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LeftSidebar from "../components/LeftSidebar";
import "./AdoptSelect.css";

const AdoptSelect = () => {
  const pets = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    name: `name ${i + 1}`,
    age: `${1 + (i % 10)}살`,
    species: "species",
    location: "location",
    gender: "male",
    image: "/image.png",
  }));

  const itemsPerPage = 16;
  const totalPages = Math.ceil(pets.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const paginatedPets = pets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFavorite = (pet) => {
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!existing.some((p) => p.id === pet.id)) {
      localStorage.setItem("favorites", JSON.stringify([...existing, pet]));
    }
  };

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
                <AdoptCard key={pet.id} pet={pet} onFavorite={handleFavorite} />
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
