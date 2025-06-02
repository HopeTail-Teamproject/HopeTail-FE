import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import "./AdoptCard.css";

const AdoptCard = ({ pet, moreLink }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("/HopeTail-FE/images/default_img.png");
  const [isFavorite, setIsFavorite] = useState(false);
  const objectUrlRef = useRef(null);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(pet.id));
  }, [pet.id]);

  useEffect(() => {
    const fetchImage = async () => {
      if (!pet.image || typeof pet.image !== "string" || pet.image.includes("image.png")) {
        setImageUrl("/HopeTail-FE/images/default_img.png");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const res = await fetch(pet.image, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("이미지 fetch 실패");
        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);
        objectUrlRef.current = objectUrl;
        setImageUrl(objectUrl);
      } catch (err) {
        console.error("이미지 불러오기 실패:", err);
        setImageUrl("/HopeTail-FE/images/default_img.png");
      }
    };

    fetchImage();

    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [pet.image]);

  const handleImageError = async (e, image) => {
    if (!image || typeof image !== "string") {
      e.target.src = "/HopeTail-FE/images/default_img.png";
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(image, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("이미지 로딩 실패");
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      e.target.src = objectUrl;
    } catch (err) {
      console.error("이미지 인증 재시도 실패:", err);
      e.target.src = "/HopeTail-FE/images/default_img.png";
    }
  };

  const handleMoreClick = () => {
    navigate(moreLink || `/adopt/${pet.id}`);
  };

  const handleHeartClick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated;
    if (favorites.includes(pet.id)) {
      updated = favorites.filter((id) => id !== pet.id);
      setIsFavorite(false);
    } else {
      updated = [...favorites, pet.id];
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="adopt-card">
      <div className="top-section">
        <img
          src={imageUrl}
          alt="pet"
          className="pet-img"
          onError={(e) => handleImageError(e, pet.image)}
        />
        <div className="side-buttons">
          <FaHeart
            className="heart-icon"
            style={{ color: isFavorite ? "red" : "gray" }}
            onClick={handleHeartClick}
          />
          <button className="more-button" onClick={handleMoreClick}>
            more
          </button>
        </div>
      </div>

      <div className="info-grid">
        <div className="row">
          <button className="info-button">{pet.name}</button>
          <button className="info-button">{pet.age}</button>
        </div>
        <div className="row">
          <button className="info-button">{pet.species}</button>
          <button className="info-button">{pet.location || "주소 없음"}</button>
        </div>
      </div>
    </div>
  );
};

export default AdoptCard;
