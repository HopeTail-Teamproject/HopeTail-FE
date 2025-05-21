import React, { useState } from 'react';
import './CommunityNewpost.css';
import { useLanguage } from '../../context/language/LanguageContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { uploadImageToServer } from '../../lib/imageUpload';

const CommunityNewpost = () => {
  const { language } = useLanguage();
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

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both the title and content.');
      return;
    }

    try {
      const uploadedUrls = await Promise.all(
        images.filter(Boolean).map((img) => uploadImageToServer(img))
      );

      const response = await axios.post('/api/posts', {
        title,
        content,
        category,
        photoUrls: uploadedUrls,
      });

      alert('Post created successfully!');
      navigate('/community');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post.');
    }
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
                {url ? (
                  <img src={url} alt="preview" />
                ) : (
                  <img src="/HopeTail-FE/images/image.png" alt="placeholder" />
                )}
              </label>
            ))}
          </div>
          <div className="input-row">
            <div className="input-category">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="REVIEW">Review</option>
                <option value="DIARY">Diary</option>
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
          <button className="post-btn" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>
      <img className="side-ad" src="/HopeTail-FE/images/AD.png" alt="AD" />
    </div>
  );
};

export default CommunityNewpost;
