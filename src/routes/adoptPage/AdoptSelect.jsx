import React, { useState, useEffect } from "react";
import AdoptCard from "../../components/common/adoptCard/AdoptCard";
import LeftSidebar from "../../components/common/leftSidebar/LeftSidebar";
import { getAllPets, likePet } from "../../lib/adoptDetail";
import { useLanguage } from "../../context/language/LanguageContext";
import adoptSelectText from "../../lib/i18n/adoptSelect";
import { isFavorite, toggleFavorite, getFavorites } from "../../lib/favorites";
import "./AdoptSelect.css";

const API_BASE = process.env.VITE_API_BASE_URL || "";

const AdoptSelect = () => {
  const { language } = useLanguage();

  const getValidLanguageKey = (lang) => {
    const map = { kr: "ko", ko: "ko", en: "en" };
    return map[lang] || "en";
  };

  const langKey = getValidLanguageKey(language);
  const text = adoptSelectText[langKey];

  const [pets, setPets] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await getAllPets(token);
        console.log("🔥 전체 응답 데이터:", res);

        const mapped = await Promise.all(
          (res || []).map(async (p) => {
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
              gender:
                p.gender === "남" || p.gender?.toLowerCase() === "male"
                  ? "male"
                  : p.gender === "여" || p.gender?.toLowerCase() === "female"
                  ? "female"
                  : "unknown",
              image: imageUrl,
            };
          })
        );

        setPets(mapped);
        setFavorites(getFavorites());
      } catch (err) {
        console.error("Failed to fetch pets:", err);
      }
    };

    fetchPets();
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
        alert(text.alertLoginRequired);
        return;
      }

      await likePet(pet.id, token);
      toggleFavorite(pet.id);
      setFavorites(getFavorites());
    } catch (err) {
      console.error("하트 실패:", err);
    }
  };

  return (
    <div className="adopt-select-wrapper">
      <div className="adopt-select-body">
        <LeftSidebar />
        <div className="adopt-select-container">
          <h2 className="adopt-title">{text.pageTitle}</h2>
          <div className="adopt-title-underline"></div>

          <div className="adopt-card-box">
            <div className="adopt-card-grid">
              {paginatedPets.map((pet) => (
                <AdoptCard
                  key={`${pet.id}-${isFavorite(pet.id)}`}
                  pet={pet}
                  onHeartClick={() => handleFavorite(pet)}
                  isFavorite={isFavorite(pet.id)}
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
