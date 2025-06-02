import React, { useState, useEffect } from "react";
import AdoptCard from "../../components/common/adoptCard/AdoptCard";
import { useLanguage } from "../../context/language/LanguageContext";
import strings from "../../lib/i18n/rehomePage2";
import "./RehomePage2.css";

const BASE_URL = process.env.VITE_API_BASE_URL || "";

const RehomePage2 = () => {
  const { language } = useLanguage();
  const TEXT = strings[language];

  const [myDogs, setMyDogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || !token) {
      console.warn("❌ 유저 또는 토큰 없음");
      return;
    }

    const fetchPets = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/petposts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("유기견 목록 불러오기 실패");
        const data = await res.json();

        const mapped = await Promise.all(
          data.map(async (p) => {
            let imageUrl = "/HopeTail-FE/images/default_img.png";

            if (p.photoUrl) {
              const url = p.photoUrl.startsWith("http")
                ? p.photoUrl
                : `${BASE_URL}${p.photoUrl}`;
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

        setMyDogs(mapped);
      } catch (err) {
        console.error("🚨 오류 발생:", err);
      }
    };

    fetchPets();
  }, [user, token]);

  const totalPages = Math.ceil(myDogs.length / itemsPerPage);
  const paginatedDogs = myDogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="rehome2-wrapper">
      <div className="rehome2-content">
        <h1 className="rehome2-title">{TEXT.title}</h1>
        <div className="rehome2-underline" />

        {paginatedDogs.length === 0 ? (
          <p className="no-dogs-message">{TEXT.noDogs}</p>
        ) : (
          <div className="card-grid">
            {paginatedDogs.map((pet) => (
              <AdoptCard
                key={pet.id || `${pet.name}-${Math.random()}`}
                pet={pet}
                moreLink={`/rehome/${pet.id}`}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
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
        )}
      </div>
    </div>
  );
};

export default RehomePage2;
