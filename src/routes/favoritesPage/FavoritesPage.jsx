import React, { useEffect, useState } from "react";
import AdoptCard from "../../components/common/adoptCard/AdoptCard";
import { useLanguage } from "../../context/language/LanguageContext";
import { getAllPets, likePet } from "../../lib/adoptDetail";
import {
  getFavorites,
  isFavorite,
  toggleFavorite,
} from "../../lib/favorites";
import favoritesPageText from "../../lib/i18n/favoritesPage";
import "./FavoritesPage.css";

const API_BASE = "https://api.hopetail.com";

const FavoritesPage = () => {
  const { language } = useLanguage();
  const text = favoritesPageText[language] || favoritesPageText["en"];

  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await getAllPets(token);
        const favorites = getFavorites();

        const mapped = await Promise.all(
          res.map(async (p) => {
            let imageUrl = "/HopeTail-FE/images/default_img.png";

            if (p.photoUrl) {
              const url = p.photoUrl.startsWith("http")
                ? p.photoUrl
                : `${API_BASE}${p.photoUrl}`;

              try {
                const imgRes = await fetch(url, {
                  headers: token ? { Authorization: `Bearer ${token}` } : {},
                });
                if (imgRes.ok) {
                  const blob = await imgRes.blob();
                  imageUrl = URL.createObjectURL(blob);
                }
              } catch (err) {
                console.warn("📛 이미지 불러오기 실패:", url);
              }
            }

            return {
              id: p.id,
              name: p.name,
              age: `${p.age}살`,
              species: p.species,
              location: p.address,
              gender: p.gender || "unknown",
              image: imageUrl,
            };
          })
        );

        const filtered = mapped.filter((pet) => favorites.includes(pet.id));
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
      toggleFavorite(pet.id);
      setPets((prev) => prev.filter((p) => isFavorite(p.id)));
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
      <h2 className="favorites-title">{text.title}</h2>
      <div className="favorites-underline" />

      {paginatedFavorites.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "40px", fontSize: "18px" }}>
          {text.empty}
        </p>
      ) : (
        <div className="favorites-card-list">
          {paginatedFavorites.map((pet) => (
            <AdoptCard
              key={pet.id}
              pet={pet}
              isFavorite={true}
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
  );
};

export default FavoritesPage;
