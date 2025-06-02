import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/language/LanguageContext";
import rehomePageText from "../../lib/i18n/rehomePage";
import axios from "axios";
import "./RehomePage.css";

const BASE_URL = process.env.VITE_API_BASE_URL || "";

const RehomePage = () => {
  const { language } = useLanguage();
  const text = rehomePageText[language] || rehomePageText["en"];
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [address, setAddress] = useState("");
  const [ageYear, setAgeYear] = useState(0);
  const [ageMonth, setAgeMonth] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files].slice(0, 5);
    setImages(newImages);
  };

  const handleImageDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (images.length < 1) {
      alert(text.alertNoImage);
      return;
    }

    try {
      const formData = new FormData();
      const dto = {
        name,
        age: ageYear,
        ageMonth,
        species,
        address,
        description: description || "소개글 없음.",
        email: user?.email,
      };

      images.forEach((img) => formData.append("image", img));
      formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));

      await axios.post(`${BASE_URL}/api/petposts`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(text.alertSuccess);
      navigate("/rehome/list");
    } catch (err) {
      console.error("등록 오류:", err.response?.data || err);
      alert(text.alertError);
    }
  };

  return (
    <div className="page-container">
      <div className="rehome-wrapper">
        <h1 className="rehome-title">{text.title}</h1>
        <div className="rehome-underline" />

        <div className="form-container">
          <div className="image-grid">
            {[0, 1, 2].map((index) => (
              <div key={index} className="form-image-box">
                {images[index] ? (
                  <>
                    <img
                      src={URL.createObjectURL(images[index])}
                      alt={`upload-${index}`}
                      className="form-image-preview"
                    />
                    <button className="delete-button" onClick={() => handleImageDelete(index)}>×</button>
                  </>
                ) : (
                  <div className="form-image-placeholder">{text.uploadPlaceholder}</div>
                )}
              </div>
            ))}
            {images.length < 5 && (
              <div className="form-image-box upload-box" onClick={() => fileInputRef.current.click()}>
                <span className="plus-icon">＋</span>
              </div>
            )}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </div>

          <div className="form-main-row">
            <div className="form-left">
              <div className="form-row">
                <label>{text.nameLabel}</label>
                <input
                  type="text"
                  className="wide-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={text.namePlaceholder}
                />
              </div>

              <div className="form-row">
                <label>{text.speciesLabel}</label>
                <input
                  type="text"
                  className="wide-input"
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  placeholder={text.speciesPlaceholder}
                />
              </div>

              <div className="form-row">
                <label>{text.addressLabel}</label>
                <input
                  type="text"
                  className="wide-input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={text.addressPlaceholder}
                />
              </div>

              <div className="form-row">
                <label>{text.ageLabel}</label>
                <input
                  type="number"
                  min="0"
                  value={ageYear}
                  onChange={(e) => setAgeYear(Number(e.target.value))}
                /> {text.years}
                <input
                  type="number"
                  min="0"
                  value={ageMonth}
                  onChange={(e) => setAgeMonth(Number(e.target.value))}
                /> {text.months}
              </div>
            </div>

            <div className="form-right">
              <textarea
                placeholder={text.descriptionPlaceholder}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button className="send-button" onClick={handleSubmit}>
                {text.submitButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RehomePage;
