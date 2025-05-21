import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaComments } from "react-icons/fa";
import { getPetDetail, likePet, deletePet } from "../../lib/pet";
import "../adoptPage/AdoptPage.css";

const RehomePage3 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdopter = user?.role === "adopter";
  const isRehomer = user?.role === "rehomer";

  useEffect(() => {
    getPetDetail(id, user?.token)
      .then(setPet)
      .catch((err) => console.error("유기견 상세 조회 실패:", err));
  }, [id]);

  const handleChatClick = () => navigate("/chat");
  const handleChooseClick = () => navigate("/adoptionPage");
  const handleEditClick = () => navigate(`/edit/${pet.id}`);
  const handleFilesClick = () => navigate(`/files/${pet.id}`);
  const handleCompleteClick = () => alert("Complete feature: 구현 예정");

  const handleLikeClick = () => {
    likePet(pet.id, user?.token)
      .then(() => alert("좋아요 완료!"))
      .catch((err) => console.error("좋아요 에러:", err));
  };

  const handleDeleteClick = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    deletePet(pet.id, user?.token)
      .then(() => {
        alert("삭제 완료!");
        navigate("/rehome2");
      })
      .catch((err) => console.error("삭제 에러:", err));
  };

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
                {isAdopter && (
                  <>
                    <button className="heart-button" onClick={handleLikeClick}>
                      <FaHeart className="heart-icon" />
                    </button>
                    <button className="chat-button" onClick={handleChatClick}>
                      <FaComments className="chat-icon" /> Chat
                    </button>
                    <button className="choose-button" onClick={handleChooseClick}>
                      Choose
                    </button>
                  </>
                )}

                {isRehomer && (
                  <>
                    <button className="chat-button" onClick={handleFilesClick}>📁 Files</button>
                    <button className="chat-button" onClick={handleEditClick}>✏️ Edit</button>
                    <button className="choose-button" onClick={handleCompleteClick}>✅ Complete</button>
                    <button className="chat-button" onClick={handleDeleteClick}>🗑️ Delete</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="description-column">
          <h3>Information</h3>
          <textarea readOnly value={pet.information || "No additional info."} />
        </div>
      </div>
    </div>
  );
};

export default RehomePage3;
