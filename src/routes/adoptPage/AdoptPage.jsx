import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../context/language/LanguageContext";
import { FaHeart, FaRegHeart, FaEnvelope } from "react-icons/fa";
import "./AdoptPage.css";

const AdoptPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [pet, setPet] = useState(null);
  const [mainImage, setMainImage] = useState("/HopeTail-FE/images/default_img.png");

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdopter = user?.role === "adopter";
  const isRehomer = user?.role === "rehomer";
  const profileImage = user?.profileImage || "/HopeTail-FE/images/user.png";

  useEffect(() => {
    const dummyPet = {
      id: parseInt(id),
      name: "Coco",
      gender: "female",
      age: "2살",
      species: "Maltese",
      location: "Seoul",
      vaccinated: "Yes",
      houseTrained: "Yes",
      neutered: "No",
      information: "Very friendly and loves people.",
      images: [
        "/HopeTail-FE/images/default_img.png",
        "/HopeTail-FE/images/default_img.png",
      ],
    };

    setPet(dummyPet);
    setMainImage(dummyPet.images[0]);
  }, [id]);

  const handleHeartClick = () => setLiked(!liked);
  const handleChooseClick = () => navigate(`/adopt/${id}/adoption`);
  const handleChatClick = () => navigate(`/adopt/${id}/chat`);
  const handleThumbnailClick = (src) => src && setMainImage(src);

  if (!pet) return <div>Loading...</div>;

  return (
    <div className="adopt-page-content">
      <div className="adopt-header">
        <h1 className="adopt-title">Adopt</h1>
        <div className="adopt-title-underline" />
      </div>

      <div className="adopt-body-wrapper">
        <div className="image-group">
          <div className="thumbnail-column">
            {pet.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumbnail"
                className="thumbnail-img"
                onClick={() => handleThumbnailClick(img)}
              />
            ))}
          </div>
          <img src={mainImage} alt="main" className="main-img" />
        </div>

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

          {isRehomer && (
            <div className="rehomer-buttons">
              <button onClick={() => navigate("/files")}>Files</button>
              <button onClick={() => alert("Change clicked!")}>Change</button>
              <button onClick={() => alert("Done clicked!")}>Done</button>
            </div>
          )}
        </div>

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
