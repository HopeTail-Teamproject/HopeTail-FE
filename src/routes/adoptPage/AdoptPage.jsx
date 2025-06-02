import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../context/language/LanguageContext";
import { FaHeart, FaRegHeart, FaEnvelope } from "react-icons/fa";
import "./AdoptPage.css";
import { getPetDetail, likePet } from "../../lib/adoptDetail";
import adoptPageText from "../../lib/i18n/adoptPage";
import { isFavorite, toggleFavorite } from "../../lib/favorites";

const API_BASE = process.env.VITE_API_BASE_URL || "";

const AdoptPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams();
  const text = adoptPageText[language] || adoptPageText["en"];

  const [liked, setLiked] = useState(false);
  const [pet, setPet] = useState(null);
  const [mainImage, setMainImage] = useState("/HopeTail-FE/images/default_img.png");
  const [mainImageUrl, setMainImageUrl] = useState("/HopeTail-FE/images/default_img.png");
  const objectUrlRef = useRef(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isRehomer = user?.role === "rehomer";
  const profileImage = user?.profileImage || "/HopeTail-FE/images/userprofile.png";

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await getPetDetail(id, token);
        const image =
          data.photoUrl?.startsWith("http")
            ? data.photoUrl
            : data.photoUrl
            ? API_BASE + data.photoUrl
            : "/HopeTail-FE/images/default_img.png";

        setPet({
          id: data.id,
          name: data.name,
          age: `${data.age} ${text.years} ${data.ageMonth || 0} ${text.months}`,
          species: data.species,
          location: data.address,
          information: data.description || text.noInformation,
          image,
        });

        setMainImage(image);
        setLiked(isFavorite(data.id));
      } catch (err) {
        console.error("❌ Failed to fetch pet detail:", err);
        setPet(null);
      }
    };

    fetchPet();
  }, [id, token, text]);

  useEffect(() => {
    const fetchAndSetImage = async (src) => {
      if (!src || src.includes("image.png")) {
        setMainImageUrl("/HopeTail-FE/images/default_img.png");
        return;
      }

      try {
        const res = await fetch(src, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);
        objectUrlRef.current = objectUrl;
        setMainImageUrl(objectUrl);
      } catch (err) {
        console.error("❌ Failed to load image:", err);
        setMainImageUrl("/HopeTail-FE/images/default_img.png");
      }
    };

    fetchAndSetImage(mainImage);

    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [mainImage, token]);

  const handleHeartClick = async () => {
    toggleFavorite(id);
    setLiked(isFavorite(id));
    try {
      await likePet(id, token);
    } catch (err) {
      console.error("❌ Failed to like pet:", err);
    }
  };

  const handleChooseClick = () => navigate(`/adopt/${id}/adoption`);
  const handleChatClick = () => navigate(`/adopt/${id}/chat`);

  if (!pet) return <div>{text.loading}</div>;

  return (
    <div className="adopt-page-content">
      <div className="adopt-header">
        <h1 className="adopt-title">{text.pageTitle}</h1>
        <div className="adopt-title-underline" />
      </div>

      <div className="adopt-body-wrapper">
        <div className="image-group">
          <img src={mainImageUrl} alt="main" className="main-img" />
        </div>

        <div className="text-column">
          <div className="name-row">
            <h2 className="pet-name">{pet.name}</h2>
            <button onClick={handleHeartClick} className="heart-button">
              {liked ? <FaHeart color="red" /> : <FaRegHeart />}
            </button>
          </div>

          <p>{text.age}: {pet.age}</p>
          <p>{text.species}: {pet.species}</p>
          <p>{text.location}: {pet.location}</p>

          <div className="chat-row">
            <img src={profileImage} alt="profile" className="chat-profile-img" />
            <FaEnvelope className="chat-icon" />
            <button className="chat-text" onClick={handleChatClick}>
              {text.chat}
            </button>
          </div>

          {isRehomer && (
            <div className="rehomer-buttons">
              <button onClick={() => navigate("/files")}>{text.files}</button>
              <button onClick={() => alert("Change clicked!")}>{text.change}</button>
              <button onClick={() => alert("Done clicked!")}>{text.done}</button>
            </div>
          )}
        </div>

        <div className="description-column">
          <h3>{text.information}</h3>
          <textarea readOnly value={pet.information} />
          <div className="choose-button-container">
            <button className="choose-button" onClick={handleChooseClick}>
              {text.choose}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptPage;
