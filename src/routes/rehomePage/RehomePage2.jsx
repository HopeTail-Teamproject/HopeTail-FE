import React, { useState, useEffect } from "react";
import AdoptCard from "../../components/common/adoptCard/AdoptCard";
import { useLanguage } from "../../context/language/LanguageContext";
import "./RehomePage2.css";

const RehomePage2 = () => {
  const { language } = useLanguage();
  const [myDogs, setMyDogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("/api/petposts")
      .then((res) => {
        if (!res.ok) throw new Error("유기견 목록 불러오기 실패");
        return res.json();
      })
      .then((data) => {
        const filtered = data.filter((pet) => pet.ownerId === user?.id);
        setMyDogs(filtered);
      })
      .catch((err) => console.error("오류 발생:", err));
  }, []);

  const totalPages = Math.ceil(myDogs.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedDogs = myDogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="page-container">
      <div className="rehome2-wrapper">
        <h1 className="rehome2-title">Rehome</h1>

        <div className="card-grid">
          {paginatedDogs.map((pet) => (
            <AdoptCard key={pet.id} pet={pet} />
          ))}
        </div>

        <div className="pagination">
          <button className="page-btn circle" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>≪</button>
          <button className="page-btn circle" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>＜</button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`page-btn circle ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button className="page-btn circle" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>＞</button>
          <button className="page-btn circle" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>≫</button>
        </div>
      </div>
    </div>
  );
};

export default RehomePage2;
