import React, { useEffect, useState } from "react";
import FilesCard from "../../components/common/filesCard/FilesCard";
import { useLanguage } from "../../context/language/LanguageContext";
import "./FilesPage.css";

const FilesPage = () => {
  const { language } = useLanguage();
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const mockPets = [
      { id: 1, name: "Coco", species: "Maltese" },
      { id: 2, name: "Milo", species: "Poodle" },
      { id: 3, name: "Luna", species: "Beagle" },
      { id: 4, name: "Max", species: "Shih Tzu" },
      { id: 5, name: "Bella", species: "Retriever" },
      { id: 6, name: "Charlie", species: "Corgi" },
    ];
    setPets(mockPets);

    /*
    // 추후 API 연동 시 사용
    const fetchPets = async () => {
      try {
        const response = await axios.get("/api/petposts");
        setPets(response.data);
      } catch (error) {
        console.error("🐶 펫 목록을 불러오는 데 실패했습니다:", error);
      }
    };
    fetchPets();
    */
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = pets.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(pets.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleBefore = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="files-page">
      <div className="files-container">
        <div className="ad-banner">
          <img src="/HopeTail-FE/images/AD.png" alt="Ad Banner" />
        </div>

        <div className="files-content">
          <h2 className="files-title">Files</h2>

          <div className="files-grid">
            {currentItems.map((item) => (
              <FilesCard key={item.id} pet={item} />
            ))}
          </div>

          <div className="files-pagination">
            <button className="files-nav" onClick={handleBefore}>
              Before
            </button>
            <div className="page-dots">
              {Array.from({ length: totalPages }, (_, i) => (
                <div
                  key={i}
                  className={`dot ${i + 1 === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                ></div>
              ))}
            </div>
            <button className="files-nav" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>

        <div className="ad-banner">
          <img src="/HopeTail-FE/images/AD.png" alt="Ad Banner" />
        </div>
      </div>
    </div>
  );
};

export default FilesPage;
