import React, { useState } from 'react';
import './CommunityNewpost.css';
import { useLanguage } from '../../context/language/LanguageContext';

const CommunityNewpost = () => {
  const { language } = useLanguage();
  const [category, setCategory] = useState('Story');
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
    console.log({ category, title, content, images });
  };

  return (
    <div className="newpost-wrapper">
      <img className="side-ad" src="/HopeTail-FE/images/AD.png" alt="AD" />
      <div className="newpost-content">
        <div className="center-container">
          <h2 className="newpost-title">New Post</h2>
          <div className="image-upload-section">
            {previewUrls.map((url, index) => (
              <label key={index} className="image-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  style={{ display: 'none' }}
                />
                {url ? <img src={url} alt="preview" /> : <img src="/HopeTail-FE/images/image.png" alt="placeholder" />}
              </label>
            ))}
          </div>
          <div className="input-row">
            <div className="input-category">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Story">Story</option>
                <option value="Tips">Tips</option>
                <option value="QnA">QnA</option>
              </select>
            </div>
            <div className="input-title">
              <label>Title</label>
              <input
                type="text"
                placeholder="Write the title of your post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="input-content">
            <label>Content</label>
            <textarea
              placeholder="Write your post content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button className="post-btn" onClick={handleSubmit}>Post</button>
        </div>
      </div>
      <img className="side-ad" src="/HopeTail-FE/images/AD.png" alt="AD" />
    </div>
  );
};

export default CommunityNewpost;
