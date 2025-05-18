import { useState } from "react";
import "./adoptForm1.css";
import DefaultImg from "/images/default_img.png";
import { useLanguage } from "../../../context/language/LanguageContext";
import { adoptForm1Text } from "../../../lib/adopt";

function AdoptForm1({ onImageSubmit }) {
  const { language } = useLanguage();
  const t = adoptForm1Text[language];

  const [previewUrls, setPreviewUrls] = useState([null, null, null, null]);
  const [files, setFiles] = useState([null, null, null, null]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newPreviews = [...previewUrls];
      const newFiles = [...files];
      newPreviews[index] = URL.createObjectURL(file);
      newFiles[index] = file;
      setPreviewUrls(newPreviews);
      setFiles(newFiles);

      // 선택된 파일 개수 확인
      const selectedFilesCount = newFiles.filter((file) => file !== null).length;

      // 최소 2장 이상 선택되었을 때 업로드
      if (selectedFilesCount >= 2) {
        // 선택된 이미지 URL들만 필터링
        const imageUrls = newPreviews.filter((url) => url !== null);
        if (onImageSubmit) {
          onImageSubmit(imageUrls);
        }
      }
    }
  };

  return (
    <div className="adopt-form1">
      <div className="form1-main">
        <div className="main-left">
          <span>{t.homePhotoRequest}</span>
          <span>{t.minimumPhotosInfo}</span>
        </div>
        <div className="main-right">
          <span>{t.allowedFormats}</span>
          <span>{t.imageDimensions}</span>
          <span>{t.fileSizeInfo}</span>
        </div>
      </div>

      <div className="image-upload-section">
        {previewUrls.map((preview, index) => (
          <div className="image-upload-box" key={index}>
            <label htmlFor={`adopt-upload-${index}`}>
              <img
                src={preview || DefaultImg}
                alt={`Upload ${index + 1}`}
                className="upload-preview"
              />
            </label>
            <input
              type="file"
              name={`adopt-image${index + 1}`}
              accept="image/png, image/jpeg, image/jpg"
              id={`adopt-upload-${index}`}
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdoptForm1;
