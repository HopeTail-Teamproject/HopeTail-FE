import { useState } from "react";
import "./adoptForm1.css";
import DefaultImg from "/images/default_img.png";

function AdoptForm1() {
  const [previewUrls, setPreviewUrls] = useState([null, null, null, null]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newPreviews = [...previewUrls];
      newPreviews[index] = URL.createObjectURL(file);
      setPreviewUrls(newPreviews);
    }
  };

  return (
    <div className="adopt-form1">
      <div className="form1-main">
        <div className="main-left">
          <span>
            Please add 4 photos of your home and any outside space as it helps the pet’s
            current owner to visualize the home you are offering.
          </span>
          <span>(A minimum of 2 photos are required but uploading 4 is better!)</span>
        </div>
        <div className="main-right">
          <span>The image format should be (.jpg, .png, .jpeg).</span>
          <span>
            The image measurements must be square in shape, with dimensions of 600 X 600
            pixels.
          </span>
          <span>The maximum & minimum image size is 1024 and 240 KB.</span>
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
