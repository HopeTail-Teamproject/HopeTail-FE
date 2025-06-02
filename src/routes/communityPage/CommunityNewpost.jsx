import React, { useState } from 'react';
import './CommunityNewpost.css';
import { useLanguage } from '../../context/language/LanguageContext';
import { useNavigate } from 'react-router-dom';
import communityNewpostText from '../../lib/i18n/communityNewpost';

const CommunityNewpost = () => {
  const { language } = useLanguage();
  const text = communityNewpostText[language] || communityNewpostText["en"];
  const navigate = useNavigate();

  const [category, setCategory] = useState('REVIEW');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([null, null, null]);
  const [previewUrls, setPreviewUrls] = useState([null, null, null]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);

      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedPreviews = [...previewUrls];
        updatedPreviews[index] = reader.result;
        setPreviewUrls(updatedPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert(text.alertIncomplete);
      return;
    }

    const dummyUrls = images
      .filter(Boolean)
      .map(() => '/HopeTail-FE/images/default_img.png');

    console.log("제출된 데이터:", {
      title,
      content,
      category,
      photoUrls: dummyUrls,
    });

    alert(text.alertSuccess);
    navigate('/community');
  };

  return (
    <div className="newpost-wrapper">
      <img className="side-ad" src="/HopeTail-FE/images/AD.png" alt="AD" />
      <div className="newpost-content">
        <div className="center-container">
          <h2 className="newpost-title">{text.pageTitle}</h2>
          <div className="newpost-title-underline" />
          <div className="image-upload-section">
            {previewUrls.map((url, index) => (
              <label key={index} className="image-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  style={{ display: 'none' }}
                />
                {url ? (
                  <img src={url} alt="preview" />
                ) : (
                  <div className="placeholder">
                    {index < 2 ? (
                      <span className="placeholder-text">{text.imagePlaceholder}</span>
                    ) : (
                      <span className="plus-icon">＋</span>
                    )}
                  </div>
                )}
              </label>
            ))}
          </div>
          <div className="input-row">
            <div className="input-category">
              <label>{text.categoryLabel}</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="REVIEW">{text.categoryReview}</option>
                <option value="DIARY">{text.categoryDiary}</option>
              </select>
            </div>
            <div className="input-title">
              <label>{text.titleLabel}</label>
              <input
                type="text"
                placeholder={text.titlePlaceholder}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="input-content">
            <label>{text.contentLabel}</label>
            <textarea
              placeholder={text.contentPlaceholder}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button className="post-btn" onClick={handleSubmit}>
            {text.postButton}
          </button>
        </div>
      </div>
      <img className="side-ad" src="/HopeTail-FE/images/AD.png" alt="AD" />
    </div>
  );
};

export default CommunityNewpost;
