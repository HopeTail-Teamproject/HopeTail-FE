import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import rehomeData from "../../data/rehomeData.json";
import image from "../assets/image.png";
import { FaFileAlt } from "react-icons/fa";
import "./AdoptPage.css"; 

const RehomePage3 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const selectedPet = rehomeData.find((p) => p.id === parseInt(id));
    setPet(selectedPet);
  }, [id]);

  const handleFilesClick = () => navigate("/filesPage");
  const handleDoneClick = () => navigate("/user");

  if (!pet) return <div>Loading...</div>;

  return (
    <div className="adopt-page-content">
      <div className="adopt-header">
        <h1 className="adopt-title">Adopt</h1>
        <div className="underline" />
      </div>

      <div className="adopt-body-wrapper">
        {/* 왼쪽 썸네일 + 이미지 + 텍스트 */}
        <div className="left-group">
          <div className="thumbnail-column">
            {pet.images?.map((img, i) => (
              <img key={i} src={img || image} alt="thumbnail" className="thumbnail-img" />
            ))}
          </div>

          <div className="image-info-group">
            <img src={pet.images?.[0] || image} alt="main" className="main-img" />

            <div className="text-column">
              <h2>{pet.name}</h2>
              <p>Gender: {pet.gender}</p>
              <p>Age: {pet.age}</p>
              <p>Species: {pet.species}</p>
              <p>Location: {pet.location}</p>
              <p>Vaccinated: {pet.vaccinated}</p>
              <p>House-Trained: {pet.houseTrained}</p>
              <p>Neutered: {pet.neutered}</p>

              <div className="chat-row">
                <FaFileAlt className="chat-icon" />
                <button className="chat-text" onClick={handleFilesClick}>Files</button>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 정보 칸 */}
        <div className="description-column">
          <h3>Information</h3>
          <textarea readOnly value={pet.information || "No additional info."} />
          <button className="choose-button" onClick={handleDoneClick}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default RehomePage3;
