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
  const [mainImage, setMainImage] = useState(image);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdopter = user?.role === "adopter";
  const isRehomer = user?.role === "rehomer";
  const profileImage = user?.profileImage || "/default-profile.png";

  useEffect(() => {
    const selectedPet = rehomeData.find((p) => p.id === parseInt(id));
    setPet(selectedPet);
    if (selectedPet?.images?.[0]) {
      setMainImage(selectedPet.images[0]);
    }
  }, [id]);

  const handleHeartClick = () => setLiked(!liked);
  const handleChooseClick = () => navigate("/adoptPage1");
  const handleChatClick = () => {
    if (isAdopter) navigate("/chatPage");
    else if (isRehomer) navigate("/chatList");
  };

  const handleThumbnailClick = (src) => {
    if (src) setMainImage(src);
  };

  if (!pet) return <div>Loading...</div>;

  return (
    <div className="adopt-page-content">
      <div className="adopt-header">
        <h1 className="adopt-title">Adopt</h1>
        <div className="adopt-title-underline" />
      </div>

      <div className="adopt-body-wrapper">
        {/* 사진 (왼쪽) */}
        <div className="image-group">
          <div className="thumbnail-column">
            {pet.images?.map((img, i) => (
              <img
                key={i}
                src={img || image}
                alt="thumbnail"
                className="thumbnail-img"
                onClick={() => handleThumbnailClick(img)}
              />
            ))}
          </div>
          <img src={mainImage} alt="main" className="main-img" />
        </div>

        {/* 글 (가운데) */}
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
            <img src={profileImage} alt="profile" className="chat-profile-img" />
            <FaEnvelope className="chat-icon" />
            <button className="chat-text" onClick={handleChatClick}>
              Chat
            </button>
          </div>
        </div>

        {/* 정보 (오른쪽) */}
        <div className="description-column">
          <h3>Information</h3>
          <textarea
            readOnly
            value={pet.information || "No additional information provided."}
          />
          {isAdopter && (
            <button className="choose-button" onClick={handleChooseClick}>
              Choose
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdoptPage;
