import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../adoptPage/AdoptPage.css";
import { getPetDetail } from "../../lib/adoptDetail";
import { useLanguage } from "../../context/language/LanguageContext";
import strings from "../../lib/i18n/rehomePage3";

const API_BASE = "https://api.hopetail.com";

const RehomePage3 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const TEXT = strings[language];

  const [pet, setPet] = useState(null);
  const [mainImage, setMainImage] = useState("/HopeTail-FE/images/default_img.png");
  const [mainImageUrl, setMainImageUrl] = useState("/HopeTail-FE/images/default_img.png");

  const objectUrlRef = useRef(null);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await getPetDetail(id, token);
        const image = data.photoUrl
          ? data.photoUrl.startsWith("http")
            ? data.photoUrl
            : API_BASE + data.photoUrl
          : "/HopeTail-FE/images/default_img.png";

        const petData = {
          id: data.id,
          name: data.name,
          age: `${data.age} ${TEXT.years} ${data.ageMonth || 0} ${TEXT.months}`,
          species: data.species,
          location: data.address,
          information: data.description || "",
          image,
          createdByEmail: data.userEmail || "",
        };

        setPet(petData);
        setMainImage(image);
      } catch (err) {
        console.error("❌ Failed to fetch pet detail:", err);
        setPet(null);
      }
    };

    fetchPet();
  }, [id, token, TEXT.years, TEXT.months]);

  useEffect(() => {
    const fetchAndSetImage = async (src) => {
      if (!src || src.includes("default_img.png")) {
        setMainImageUrl("/HopeTail-FE/images/default_img.png");
        return;
      }

      try {
        const res = await fetch(src, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("이미지 로딩 실패");

        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);
        objectUrlRef.current = objectUrl;
        setMainImageUrl(objectUrl);
      } catch (err) {
        console.error("❌ 이미지 로딩 실패:", err);
        setMainImageUrl("/HopeTail-FE/images/default_img.png");
      }
    };

    if (mainImage) fetchAndSetImage(mainImage);

    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [mainImage, token]);

  const handleFilesClick = () => navigate(`/files/${id}`);

  const handleDoneClick = async () => {
    if (!window.confirm(TEXT.confirm)) return;

    const petId = parseInt(id, 10);
    if (!petId || !token) {
      alert(TEXT.invalid);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/petposts/${petId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Fail");

      alert(TEXT.success);
      navigate("/rehome2");
    } catch (err) {
      console.error("❌ 분양 완료 처리 실패:", err);
      alert(TEXT.failure + err.message);
    }
  };

  if (!pet) return <div>Loading...</div>;

  return (
    <div className="adopt-page-content">
      <div className="adopt-header">
        <h1 className="adopt-title">{TEXT.rehome}</h1>
        <div className="adopt-title-underline" />
      </div>

      <div className="adopt-body-wrapper">
        <div className="image-group">
          {mainImageUrl && (
            <img src={mainImageUrl} alt="main" className="main-img" />
          )}
        </div>

        <div className="text-column">
          <h2>{pet.name}</h2>
          <p>{TEXT.age}: {pet.age}</p>
          <p>{TEXT.species}: {pet.species}</p>
          <p>{TEXT.location}: {pet.location}</p>

          <div className="files-image-button" onClick={handleFilesClick}>
            <img src="/HopeTail-FE/images/files.png" alt="files" className="files-img" />
            <span className="files-label">{TEXT.files}</span>
          </div>
        </div>

        <div className="description-column">
          <h3>{TEXT.info}</h3>
          <textarea readOnly value={pet.information || TEXT.noInfo} />
          <div className="double-buttons">
            {user?.email === pet.createdByEmail && (
              <button className="choose-button" onClick={handleDoneClick}>
                {TEXT.done}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RehomePage3;
