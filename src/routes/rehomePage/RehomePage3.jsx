import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaComments } from "react-icons/fa";
import "../adoptPage/AdoptPage.css";

const RehomePage3 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    fetch(`/api/petposts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch pet detail");
        return res.json();
      })
      .then((data) => {
        setPet(data);
      })
      .catch((err) => {
        console.error("유기견 상세 조회 실패:", err);
      });
  }, [id]);

  const handleChatClick = () => navigate("/chat");
  const handleChooseClick = () => navigate("/adoptionPage");

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
              <img
                key={i}
                src={img || "/images/image.png"}
                alt="thumbnail"
                className="thumbnail-img"
              />
            ))}
          </div>

          <div className="image-info-group">
            <img
              src={pet.images?.[0] || "/images/image.png"}
              alt="main"
              className="main-img"
            />

            <div className="text-column">
              <h2>{pet.name}</h2>
              <p>Gender: {pet.gender}</p>
              <p>Age: {pet.age}</p>
              <p>Species: {pet.species}</p>
              <p>Location: {pet.location}</p>
              <p>Vaccinated: {pet.vaccinated ? "Yes" : "No"}</p>
              <p>House-Trained: {pet.houseTrained ? "Yes" : "No"}</p>
              <p>Neutered: {pet.neutered ? "Yes" : "No"}</p>

              <div className="action-row">
                <button className="heart-button">
                  <FaHeart className="heart-icon" />
                </button>
                <button className="chat-button" onClick={handleChatClick}>
                  <FaComments className="chat-icon" /> Chat
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="description-column">
          <h3>Information</h3>
          <textarea readOnly value={pet.information || "No additional info."} />
          <button className="choose-button" onClick={handleChooseClick}>
            Choose
          </button>
        </div>
      </div>
    </div>
  );
};

export default RehomePage3;
