import React from "react";
import "./FilesCard.css";

const FilesCard = ({ pet }) => {
  return (
    <div className="files-card">
      <div className="card-image">
        <img src="/images/image.png" alt="pet" />
      </div>
      <div className="card-info">
        <div className="info-buttons">
          <button className="info-btn">{pet.name}</button>
          <button className="info-btn">{pet.species}</button>
        </div>
        <div className="files-label">
          <img
            src="/images/files.png"
            alt="files icon"
            className="files-icon"
          />
          <span>Files</span>
        </div>
      </div>
    </div>
  );
};

export default FilesCard;
