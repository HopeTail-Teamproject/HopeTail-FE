import React from "react";
import { useLanguage } from "../../context/language/LanguageContext";
import "./FilesPage.css";

const FilesPage = () => {
  const { language } = useLanguage();

  const items = [
    { id: 1, name: "Coco", species: "Maltese", hasFiles: true },
    { id: 2, name: "Milo", species: "Poodle", hasFiles: true },
    { id: 3, name: "Luna", species: "Beagle", hasFiles: true },
    { id: 4, name: "Max", species: "Shih Tzu", hasFiles: true },
    { id: 5, name: "Bella", species: "Retriever", hasFiles: true },
    { id: 6, name: "Charlie", species: "Corgi", hasFiles: true },
  ];

  const filteredItems = items.filter((item) => item.hasFiles);

  return (
    <div className="files-page">
      <div className="files-container">
        <img src="/images/AD.png" alt="AD Left" className="ad-side" />

        <div className="files-content">
          <h2 className="files-title">Files</h2>

          <div className="files-grid">
            {filteredItems.map((item) => (
              <div className="files-card" key={item.id}>
                <img src="/images/image.png" alt="pet" className="card-image" />
                <div className="card-info">
                  <div className="info-buttons">
                    <button className="info-btn">{item.name}</button>
                    <button className="info-btn">{item.species}</button>
                  </div>
                  <div className="files-label">
                    <img src="/images/files.png" alt="files icon" className="files-icon" />
                    <span>Files</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="files-pagination">
            <button className="files-nav">Before</button>
            <div className="page-dots">
              <div className="dot active"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <button className="files-nav">Next</button>
          </div>
        </div>

        <img src="/images/AD.png" alt="AD Right" className="ad-side" />
      </div>
    </div>
  );
};

export default FilesPage;
