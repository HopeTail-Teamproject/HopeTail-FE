import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../context/language/LanguageContext";
import { FaHeart, FaRegHeart, FaEnvelope } from "react-icons/fa";
import image from "../../assets/image.png";
import "./AdoptPage.css";

// 예시 데이터: 실제로는 context, props, API 등으로 불러와야 함
import rehomeData from "../../data/rehomeData.json";

const AdoptPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const selectedPet = rehomeData.find((p) => p.id === parseInt(id));
    setPet(selectedPet);
  }, [id]);

  const handleHeartClick = () => setLiked(!liked);
  const handleChooseClick = () => navigate("/adoptPage1");
  const handleChatClick = () => navigate("/chatPage");

  if (!pet) return <div>Loading...</div>;

  return (
    <div className="adopt-page-content">
      <div className="adopt-header">
        <h1 className="adopt-title">Adopt</h1>
        <div className="underline" />
      </div>

      <div className="adopt-body-wrapper">
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
              <div className="row-inline">
                <p>House-Trained: {pet.houseTrained}</p>
                <button onClick={handleHeartClick} className="heart-button">
                  {liked ? <FaHeart color="red" /> : <FaRegHeart />}
                </button>
              </div>
              <p>Neutered: {pet.neutered}</p>
              <div className="chat-row">
                <span className="chat-gradient-circle" />
                <FaEnvelope className="chat-icon" />
                <button className="chat-text" onClick={handleChatClick}>Chat</button>
              </div>
            </div>
          </div>
        </div>

        <div className="description-column">
          <h3>Information</h3>
          <textarea
            readOnly
            value={pet.information || "No additional information provided."}
          />
          <button className="choose-button" onClick={handleChooseClick}>Choose</button>
        </div>
      </div>
    </div>
  );
};

export default AdoptPage;
