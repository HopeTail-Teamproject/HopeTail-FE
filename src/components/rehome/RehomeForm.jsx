import React, { useState } from "react";
import "../../routes/rehomePage/RehomePage.css";

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

  const handleSubmit = () => {
    alert("연동 전 임시 제출: 콘솔 확인");
    console.log({
      name,
      ageYear,
      ageMonth,
      gender,
      weight,
      height,
      vaccinated,
      houseTrained,
      neutered,
      description,
    });
  };

  return (
    <div className="form-container">
      <div className="image-grid">
        <div className="form-image-placeholder">Upload at least 3 image</div>
        <div className="form-image-placeholder">Upload at least 3 image</div>
        <div className="form-image-placeholder">Upload at least 3 image</div>
        <div className="form-image-placeholder">+</div>
      </div>

      {/* ✅ 좌우 정렬 위한 row */}
      <div className="form-main-row">
        <div className="form-left">
          <div className="form-row">
            <label>Dog Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-row">
            <label>Age</label>
            <input type="number" value={ageYear} onChange={(e) => setAgeYear(Number(e.target.value))} /> years
            <input type="number" value={ageMonth} onChange={(e) => setAgeMonth(Number(e.target.value))} /> months
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
              />{" "}
              ♂
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              ♀
            </label>
          </div>

          <div className="form-row">
            <label>Weight</label>
            <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} /> kg
            <label>Height</label>
            <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} /> cm
          </div>

          <div className="form-row">
            <label>
              <input type="checkbox" checked={vaccinated} onChange={() => setVaccinated(!vaccinated)} /> Vaccinated
            </label>
            <label>
              <input type="checkbox" checked={houseTrained} onChange={() => setHouseTrained(!houseTrained)} /> House-Trained
            </label>
            <label>
              <input type="checkbox" checked={neutered} onChange={() => setNeutered(!neutered)} /> Neutered
            </label>
          </div>
        </div>

        <div className="form-right">
          <textarea
            placeholder="Write about your dog’s story."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="send-button" onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default RehomeForm;
