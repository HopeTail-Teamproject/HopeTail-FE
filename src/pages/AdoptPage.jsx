import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../language/LanguageContext";
import image from "../assets/image.png";
import { FaHeart, FaRegHeart, FaEnvelope } from "react-icons/fa";
import "./AdoptPage.css";

const AdoptPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const handleHeartClick = () => setLiked(!liked);
  const handleChooseClick = () => navigate("/adoption_Page");
  const handleChatClick = () => navigate("/chat");

  return (
    <div className="adopt-page-container">
      <Navbar />

      <main className="adopt-page-main">
        <h1 className="adopt-title">Adopt</h1>
        <div className="underline" />

        <div className="adopt-body-wrapper">
          <div className="thumbnail-column">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={image} alt="thumbnail" className="thumbnail-img" />
            ))}
          </div>

          <div className="center-column">
            <img src={image} alt="main" className="main-img" />

            <div className="text-column">
              <h2>Dog_name</h2>
              <p>Gender: Female or male</p>
              <p>Age: 2 years and 3 months</p>
              <p>Species: species</p>
              <p>
                Location: 47, Hanyangdaehak 1-gil,<br />
                Sangnok-gu, Ansan-si,<br />
                Gyeonggi-do
              </p>
              <p>Vaccinated: yy/mm/dd</p>
              <div className="row-inline">
                <p>House-Trained: Yes or No</p>
                <button onClick={handleHeartClick} className="heart-button">
                  {liked ? <FaHeart color="red" /> : <FaRegHeart />}
                </button>
              </div>
              <p>Neutered : Yes or No</p>
              <div className="chat-row">
                <span className="chat-gradient-circle" />
                <FaEnvelope className="chat-icon" />
                <button className="chat-text" onClick={handleChatClick}>Chat</button>
              </div>
            </div>
          </div>

          <div className="description-column">
            <h3>Information</h3>
            <textarea
              readOnly
              value={"Introducing Dog_name!\nTEXT\n450글자"}
            />
            <button className="choose-button" onClick={handleChooseClick}>Choose</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdoptPage;
