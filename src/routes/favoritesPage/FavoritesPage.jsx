import React, { useEffect, useState } from "react";
import AdoptCard from "../../components/common/adoptCard/AdoptCard";
import { useLanguage } from "../../context/language/LanguageContext";
import { getAllPets, likePet } from "../../lib/adoptDetail";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const { language } = useLanguage();
  const [pets, setPets] = useState([]);
  const [favoritedIds, setFavoritedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await getAllPets();
        const stored = JSON.parse(localStorage.getItem("favorites")) || [];

        const mapped = res.map((p) => ({
          id: p.id,
          name: p.name,
          age: `${p.age}살`,
          species: p.species,
          location: p.address,
          gender: p.gender || "unknown",
          image: p.photoUrl || "/images/image.png",
        }));

        const filtered = mapped.filter((pet) => stored.includes(pet.id));

        setFavoritedIds(stored);
        setPets(filtered);
      } catch (err) {
        console.error("즐겨찾기 불러오기 실패:", err);
      }
    };

    fetchFavorites();
  }, []);

  const handleLikeToggle = async (pet) => {
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await likePet(pet.id, token);

      const updated = favoritedIds.includes(pet.id)
        ? favoritedIds.filter((id) => id !== pet.id)
        : [...favoritedIds, pet.id];

      localStorage.setItem("favorites", JSON.stringify(updated));
      setFavoritedIds(updated);
      setPets((prev) => prev.filter((p) => updated.includes(p.id)));
    } catch (err) {
      console.error("하트 실패:", err);
    }
  };

  const totalPages = Math.ceil(pets.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedFavorites = pets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="favorites-page">
      <h2 className="favorites-title">Favorites</h2>

      {paginatedFavorites.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "40px", fontSize: "18px" }}>
          아직 관심 동물이 없습니다.
        </p>
      ) : (
        <div className="favorites-card-list">
          {paginatedFavorites.map((pet) => (
            <AdoptCard
              key={pet.id}
              pet={pet}
              isFavorite={favoritedIds.includes(pet.id)}
              onHeartClick={() => handleLikeToggle(pet)}
            />
          ))}
        </div>
      )}

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
            className={`page-btn circle ${currentPage === index + 1 ? "active" : ""}`}
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
  );
};

export default FavoritesPage;
