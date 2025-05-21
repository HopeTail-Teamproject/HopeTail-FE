import React, { useState, useEffect } from "react";
import AdoptCard from "../../components/common/adoptCard/AdoptCard";
import LeftSidebar from "../../components/common/leftSidebar/LeftSidebar";
import { getAllPets, likePet } from "../../lib/adoptDetail";
import "./AdoptSelect.css";

const AdoptSelect = () => {
  const [pets, setPets] = useState([]);
  const [favorites, setFavorites] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await getAllPets(token);
        const mapped = res.map((p) => ({
          id: p.id,
          name: p.name,
          age: `${p.age}살`,
          species: p.species,
          location: p.address,
          gender: p.gender || "unknown",
          image: p.photoUrl || "/images/image.png",
        }));
        setPets(mapped);
      } catch (err) {
        console.error("Failed to fetch pets:", err);
      }
    };

    fetchPets();

    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const totalPages = Math.ceil(pets.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const paginatedPets = pets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFavorite = async (pet) => {
    try {
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      await likePet(pet.id, token);

      const exists = favorites.includes(pet.id);
      const updated = exists
        ? favorites.filter((id) => id !== pet.id)
        : [...favorites, pet.id];

      localStorage.setItem("favorites", JSON.stringify(updated));
      setFavorites(updated);
    } catch (err) {
      console.error("하트 실패:", err);
    }
  };

  return (
    <div className="adopt-select-wrapper">
      <div className="adopt-select-body">
        <LeftSidebar />
        <div className="adopt-select-container">
          <h2 className="adopt-title">Adopt</h2>
          <div className="adopt-title-underline"></div>

          <div className="adopt-card-box">
            <div className="adopt-card-grid">
              {paginatedPets.map((pet) => (
                <AdoptCard
                  key={`${pet.id}-${favorites.includes(pet.id)}`} 
                  pet={pet}
                  onHeartClick={() => handleFavorite(pet)}
                  isFavorite={favorites.includes(pet.id)} 
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
    </div>
  );
};

export default AdoptSelect;
