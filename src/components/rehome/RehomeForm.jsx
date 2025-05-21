import React, { useState, useRef } from "react";
import "../../routes/rehomePage/RehomePage.css";
import { uploadImageToServer } from "../../lib/imageUpload";

const RehomeForm = () => {
  const [name, setName] = useState("Hope");
  const [ageYear, setAgeYear] = useState(2);
  const [ageMonth, setAgeMonth] = useState(3);
  const [gender, setGender] = useState("female");
  const [weight, setWeight] = useState(12);
  const [height, setHeight] = useState(91);
  const [vaccinated, setVaccinated] = useState(true);
  const [houseTrained, setHouseTrained] = useState(true);
  const [neutered, setNeutered] = useState(true);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files].slice(0, 5);
    setImages(newImages);
  };

  const handleImageDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async () => {
    if (images.length < 3) {
      alert("사진은 최소 3장 이상 업로드해야 합니다.");
      return;
    }

    try {
      const photoUrl = await uploadImageToServer(images[0]);

      const petData = {
        photoUrl,
        name,
        age: parseInt(ageYear) + parseInt(ageMonth) / 12,
        species: "Unknown",
        address: "서울시 강남구 테헤란로 123",
        description,
      };

      const res = await fetch("/api/petposts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(petData),
      });

      if (res.ok) {
        const result = await res.json(); // ✅ 여기!
        console.log("등록 성공 응답:", result); // ✅ 확인용
        alert("등록 완료!");
        window.location.reload();
      } else {
        alert("등록 실패");
      }
    } catch (err) {
      console.error("등록 오류:", err);
      alert("에러 발생");
    }
  };

  return (
    <div className="form-container">
      <div className="image-grid">
        {[0, 1, 2].map((index) => (
          <div key={index} className="form-image-box">
            {images[index] ? (
              <>
                <img
                  src={URL.createObjectURL(images[index])}
                  alt={`upload-${index}`}
                  className="form-image-preview"
                />
                <button
                  className="delete-button"
                  onClick={() => handleImageDelete(index)}
                >
                  ×
                </button>
              </>
            ) : (
              <div className="form-image-placeholder">Upload at least 3 image</div>
            )}
          </div>
        ))}

        {images.length < 5 && (
          <div
            className="form-image-box upload-box"
            onClick={() => fileInputRef.current.click()}
          >
            <span className="plus-icon">＋</span>
          </div>
        )}

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </div>

      <div className="form-main-row">
        <div className="form-left">
          <div className="form-row">
            <label>Dog Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Age</label>
            <input
              type="number"
              value={ageYear}
              onChange={(e) => setAgeYear(Number(e.target.value))}
            /> years
            <input
              type="number"
              value={ageMonth}
              onChange={(e) => setAgeMonth(Number(e.target.value))}
            /> months
          </div>

          <div className="form-row">
            <label>Gender</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              /> ♂
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              /> ♀
            </label>
          </div>

          <div className="form-row">
            <label>Weight</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            /> kg
            <label>Height</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            /> cm
          </div>

          <div className="form-row">
            <label>
              <input
                type="checkbox"
                checked={vaccinated}
                onChange={() => setVaccinated(!vaccinated)}
              /> Vaccinated
            </label>
            <label>
              <input
                type="checkbox"
                checked={houseTrained}
                onChange={() => setHouseTrained(!houseTrained)}
              /> House-Trained
            </label>
            <label>
              <input
                type="checkbox"
                checked={neutered}
                onChange={() => setNeutered(!neutered)}
              /> Neutered
            </label>
          </div>
        </div>

        <div className="form-right">
          <textarea
            placeholder="Write about your dog’s story."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="send-button" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default RehomeForm;
