import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import "./AdoptCard.css";

const AdoptCard = ({ pet, onFavorite, isFavorited }) => {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate(`/adopt/${pet.id}`);
  };

  return (
    <div className="adopt-card">
      <div className="top-section">
        <img
          src={pet.image || "/images/default_img.png"}
          alt="pet"
          className="pet-img"
        />
        <div className="side-buttons">
          <FaHeart
            className="heart-icon"
            style={{ color: isFavorited ? "red" : "gray" }}
            onClick={() => onFavorite(pet)}
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
          <button className="gender-button">
            {pet.gender === "male" ? "♂" : "♀"}
          </button>
        </div>
        <div className="row">
          <button className="info-button">{pet.species}</button>
          <button className="info-button">{pet.location}</button>
        </div>
      </div>
    </div>
  );
};

export default AdoptCard;
