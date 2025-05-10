import React, { useState } from 'react';
import './CommunityNewpost.css';
import Navbar from "../components/common/navbar/Navbar";
import Footer from "../components/common/footer/Footer";
import { useLanguage } from "../context/language/LanguageContext";
import adImage from '../assets/AD.png';
import defaultImage from '../assets/image.png';

const CommunityNewpost = () => {
  const { language } = useLanguage();

  const [category, setCategory] = useState('Story');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    const postData = {
      category,
      title,
      content,
    };

    console.log('Submitted post:', postData);
    alert('Post submitted!');
  };

  return (
    <div className="newpost-wrapper">
      <Navbar />
      <div className="newpost-content">
        <img src={adImage} alt="ad" className="side-ad" />

        <main className="newpost-main">
          <h2 className="newpost-title">New Post</h2>

          <div className="image-preview-row">
            <img src={defaultImage} alt="preview1" className="preview-image" />
            <img src={defaultImage} alt="preview2" className="preview-image" />
            <img src={defaultImage} alt="preview3" className="preview-image" />
          </div>

          <div className="form-section">
            <div className="form-group category-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Story</option>
                <option>Tips</option>
              </select>
            </div>

            <div className="form-group title-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Write the title of your post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group full">
              <label>Content</label>
              <textarea
                placeholder="Write your post content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="post-button-wrapper">
              <button className="post-button" onClick={handleSubmit}>
                Post
              </button>
            </div>
          </div>
        </main>

        <img src={adImage} alt="ad" className="side-ad" />
      </div>
      <Footer />
    </div>
  );
};

export default CommunityNewpost;
