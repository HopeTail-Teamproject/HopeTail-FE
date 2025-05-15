import React from "react";
import "../routes/rehomePage/RehomePage.css";

const RehomeForm = () => {
  return (
    <div className="form-container">
      <div className="image-grid">
        <img src="/images/image3.png" alt="img1" className="form-image" />
        <img src="/images/image3.png" alt="img2" className="form-image" />
        <img src="/images/image3.png" alt="img3" className="form-image" />
        <img src="/images/image33.png" alt="img4" className="form-image" />
      </div>

      <div className="form-row">
        <label>Dog Name</label>
        <input type="text" value="Hope" readOnly />
      </div>

      <div className="form-row age-row">
        <label>Age</label>
        <input type="number" value="2" readOnly /> <span>years</span>
        <input type="number" value="3" readOnly /> <span>months</span>
      </div>

      <div className="form-row gender-row">
        <label>Gender</label>
        <div className="gender-icons">
          <input type="radio" name="gender" id="male" />
          <label htmlFor="male">♂</label>
          <input type="radio" name="gender" id="female" defaultChecked />
          <label htmlFor="female">♀</label>
        </div>
      </div>

      <div className="form-row measure-row">
        <label>Weight</label>
        <input type="number" value="12" readOnly /> <span>kg</span>
        <label>Height</label>
        <input type="number" value="91" readOnly /> <span>cm</span>
      </div>

      <div className="check-row">
        <span>Vaccinated ✓</span>
        <span>House-Trained ✓</span>
        <span>Neutrated ✓</span>
      </div>

      <textarea placeholder="Write about your dog's story." defaultValue="" />
      <button className="send-button">Send</button>
    </div>
  );
};

export default RehomeForm;
