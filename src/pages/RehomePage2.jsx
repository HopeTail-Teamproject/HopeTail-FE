// src/pages/RehomePage2.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdoptCard from "../components/AdoptCard";
import { LanguageProvider } from "../language/LanguageContext";
import "./RehomePage2.css";

const dogList = [
  { id: 1, name: "Hope", age: "2", species: "Maltese", location: "Seoul" },
  { id: 2, name: "Coco", age: "1", species: "Poodle", location: "Busan" },
  { id: 3, name: "Buddy", age: "4", species: "Jindo", location: "Incheon" },
  { id: 4, name: "Luna", age: "3", species: "Shiba", location: "Daegu" },
];

const RehomePage2 = () => {
  return (
    <LanguageProvider>
      <div className="page-container">
        <Navbar />
        <div className="rehome2-wrapper">
          <h1 className="rehome2-title">Rehome</h1>
          <div className="card-grid">
            {dogList.map((dog) => (
              <AdoptCard
                key={dog.id}
                name={dog.name}
                age={dog.age}
                species={dog.species}
                location={dog.location}
              />
            ))}
          </div>
          <div className="pagination">
            {[1, 2, 3, 4, 5, 6, 7].map((page) => (
              <button key={page} className="page-btn">
                {page}
              </button>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default RehomePage2;
