import React from "react";
import { useNavigate } from "react-router-dom";
import "./FilesCard.css";

const FilesCard = ({ pet }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/files/${pet.id}`);
  };

  const imageUrl =
    pet.image || pet.photoUrl || "/HopeTail-FE/images/default_img.png";

  return (
    <div className="files-card">
      <div className="card-left">
        <img
          src={imageUrl}
          alt="pet"
          className="card-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/HopeTail-FE/images/default_img.png";
          }}
        />
      </div>
      <div className="card-right">
        <div className="info-buttons">
          <button className="info-btn">{pet.name}</button>
          <button className="info-btn">{pet.species}</button>
        </div>
        <div className="files-label" onClick={handleClick}>
          <img
            src="/HopeTail-FE/images/files.png"
            alt="files icon"
            className="files-icon"
            onError={(e) => (e.target.style.display = "none")}
          />
          <span>Files</span>
        </div>
      </div>
    </div>
  );
};

export default FilesCard;
