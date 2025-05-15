import React, { useState } from 'react';
import './CommunityNewpost.css';
import { useLanguage } from "../../context/language/LanguageContext";

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
      <div className="newpost-content">
        <img src="/images/AD.png" alt="ad" className="side-ad" />

        <main className="newpost-main">
          <h2 className="newpost-title">New Post</h2>

          <div className="image-preview-row">
            <img src="/images/image.png" alt="preview1" className="preview-image" />
            <img src="/images/image.png" alt="preview2" className="preview-image" />
            <img src="/images/image.png" alt="preview3" className="preview-image" />
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

        <img src="/images/AD.png" alt="ad" className="side-ad" />
      </div>
    </div>
  );
};

export default CommunityNewpost;
