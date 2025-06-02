import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../context/language/LanguageContext";
import { FaHeart, FaRegHeart, FaEnvelope } from "react-icons/fa";
import "./AdoptPage.css";
import { getPetDetail, likePet } from "../../lib/adoptDetail";
import adoptPageText from "../../lib/i18n/adoptPage";
import { isFavorite, toggleFavorite } from "../../lib/favorites";

const API_BASE = "https://api.hopetail.com";

const AdoptPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams();

  const [liked, setLiked] = useState(false);
  const [pet, setPet] = useState(null);
  const [mainImage, setMainImage] = useState("/HopeTail-FE/images/default_img.png");
  const [mainImageUrl, setMainImageUrl] = useState("/HopeTail-FE/images/default_img.png");
  const objectUrlRef = useRef(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const isRehomer = user?.role === "rehomer";
  const profileImage = user?.profileImage || "/HopeTail-FE/images/userprofile.png";
  const text = adoptPageText[language] || adoptPageText["en"];

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await getPetDetail(id, token);
        const images = [
          data.photoUrl
            ? data.photoUrl.startsWith("http")
              ? data.photoUrl
              : API_BASE + data.photoUrl
            : "/HopeTail-FE/images/default_img.png",
        ];

        const petData = {
          id: data.id,
          name: data.name,
          age: `${data.age} years and 3 months`,
          species: data.species,
          location: data.address,
          vaccinated: data.vaccinated ? "Yes" : "No",
          houseTrained: data.houseTrained ? "Yes" : "No",
          neutered: data.neutered ? "Yes" : "No",
          information: data.description || "",
          images,
        };

        setPet(petData);
        setMainImage(petData.images[0]);
        setLiked(isFavorite(petData.id));
      } catch (err) {
        console.error("❌ Failed to fetch pet detail:", err);
        setPet(null);
      }
    };

    fetchPet();
  }, [id, token]);

  useEffect(() => {
    const fetchAndSetImage = async (src) => {
      if (!src || src === "" || src.includes("image.png")) {
        setMainImageUrl("/HopeTail-FE/images/default_img.png");
        return;
      }

      try {
        const res = await fetch(src, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) {
          console.warn("❌ 대표 이미지 fetch 실패:", res.status);
          setMainImageUrl("/HopeTail-FE/images/default_img.png");
          return;
        }
        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);
        objectUrlRef.current = objectUrl;
        setMainImageUrl(objectUrl);
      } catch (err) {
        console.error("대표 이미지 로드 실패:", err);
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
          <p>{text.vaccinated}: {pet.vaccinated}</p>
          <p>{text.houseTrained}: {pet.houseTrained}</p>
          <p>{text.neutered}: {pet.neutered}</p>

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
          <textarea readOnly value={pet.information || text.noInformation} />
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
