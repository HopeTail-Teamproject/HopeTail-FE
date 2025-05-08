import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdoptCard.css";
import { FaHeart, FaMars } from "react-icons/fa";

const AdoptCard = ({ pet, onFavorite }) => {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate(`/adopt/${pet.id}`);
  };

  return (
    <div className="adopt-card">
      <FaHeart className="heart-icon" onClick={() => onFavorite(pet)} />

      <div className="card-top-row">
        <img src={pet.image || "/default.png"} alt="pet" className="pet-img" />
        <button className="more-button" onClick={handleMoreClick}>
          more
        </button>
      </div>

      <div className="info-section">
        <div className="row">
          <button className="info-button">{pet.name}</button>
          <button className="info-button">{pet.age}</button>
          <FaMars className="sex-icon" />
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
