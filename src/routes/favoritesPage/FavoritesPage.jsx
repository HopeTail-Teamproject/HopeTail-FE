import React, { useEffect, useState } from "react";
import AdoptCard from "../../components/common/adoptCard/AdoptCard";
import { useLanguage } from "../../context/language/LanguageContext";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const { language } = useLanguage();
  const [pets, setPets] = useState([]);
  const [favoritedPets, setFavoritedPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  useEffect(() => {
    const dummyPets = [
      {
        id: 1,
        name: "Coco",
        age: "2살",
        gender: "female",
        species: "Maltese",
        location: "Seoul",
        image: "/images/image.png",
      },
      {
        id: 2,
        name: "Max",
        age: "3살",
        gender: "male",
        species: "Poodle",
        location: "Busan",
        image: "/images/image.png",
      },
      {
        id: 3,
        name: "Bella",
        age: "1살",
        gender: "female",
        species: "Beagle",
        location: "Incheon",
        image: "/images/image.png",
      },
    ];

    const favoriteIds = [1, 2, 3];
    localStorage.setItem("favorites", JSON.stringify(favoriteIds));

    const filtered = dummyPets.filter((pet) => favoriteIds.includes(pet.id));
    setPets(filtered);
    setFavoritedPets(favoriteIds);
  }, []);

  const handleLikeToggle = (petId) => {
    let updatedFavorites;
    if (favoritedPets.includes(petId)) {
      updatedFavorites = favoritedPets.filter((id) => id !== petId);
    } else {
      updatedFavorites = [...favoritedPets, petId];
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavoritedPets(updatedFavorites);
    setPets((prev) => prev.filter((pet) => updatedFavorites.includes(pet.id)));
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
              isFavorite={favoritedPets.includes(pet.id)}
              onHeartClick={() => handleLikeToggle(pet.id)}
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
