import React, { useEffect, useState } from "react";
import FilesCard from "../../components/common/filesCard/FilesCard";
import { useLanguage } from "../../context/language/LanguageContext";
import "./FilesPage.css";

const FilesPage = () => {
  const { language } = useLanguage();
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const BASE_URL = process.env.VITE_API_BASE_URL || "";

  useEffect(() => {
    const fetchPets = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`${process.env.VITE_API_BASE_URL}/api/petposts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("펫 목록 불러오기 실패");
        const data = await res.json();

        const mapped = await Promise.all(
          data.map(async (p) => {
            let imageUrl = `${BASE_URL}/images/default_img.png`;

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
              ...p,
              image: imageUrl,
            };
          })
        );

        setPets(mapped);
      } catch (err) {
        console.error("🚨 오류 발생:", err);
      }
    };

    fetchPets();
  }, [BASE_URL]);

  const totalPages = Math.ceil(pets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = pets.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="files-page">
      <div className="files-container">
        <div className="ad-banner ad-left">
          <img src={`${BASE_URL}/images/AD.png`} alt="Ad Banner" />
        </div>

        <div className="files-content">
          <h2 className="files-title">Files</h2>
          <div className="files-title-underline"></div>

          <div className="files-grid">
            {currentItems.map((item) => (
              <FilesCard key={item.id} pet={item} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="bookmark-pagination-wrapper">
              <button
                className="bookmark-nav-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Before
              </button>

              <div className="dot-indicators">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <div
                    key={i}
                    className={`dot ${currentPage === i + 1 ? "active" : ""}`}
                    onClick={() => handlePageChange(i + 1)}
                  ></div>
                ))}
              </div>

              <button
                className="bookmark-nav-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="ad-banner ad-right">
          <img src={`${BASE_URL}/images/AD.png`} alt="Ad Banner" />
        </div>
      </div>
    </div>
  );
};

export default FilesPage;
