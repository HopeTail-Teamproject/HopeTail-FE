import "./adoptForm3.css";

function AdoptForm3() {
  return (
    <div className="adopt-form3">
      <div className="form3-main">
        <div className="radio-form">
          <span>Are there any other animals at your home?</span>
          <div className="radio-box">
            <label htmlFor="yes">
              Yes
              <input type="radio" name="otherAnimal" value="yes" required />
            </label>
            <label htmlFor="no">
              No
              <input type="radio" name="otherAnimal" value="no" required />
            </label>
          </div>
        </div>
        <div className="question-form">
          <span>If yes, please state their species, age and gender</span>
          <textarea
            id="otherAnimalState"
            name="otherAnimalState"
            placeholder="text"
            required
          />
        </div>
        <div className="radio-form">
          <span>If yes, are they neutered?</span>
          <div className="radio-box">
            <label htmlFor="yes">
              Yes
              <input type="radio" name="neutered" value="yes" required />
            </label>
            <label htmlFor="no">
              No
              <input type="radio" name="neutered" value="no" required />
            </label>
          </div>
        </div>
        <div className="radio-form">
          <span>If yes, have they been vaccinated in the last 12 month?</span>
          <div className="radio-box">
            <label htmlFor="yes">
              Yes
              <input type="radio" name="vaccinated" value="yes" required />
            </label>
            <label htmlFor="no">
              No
              <input type="radio" name="vaccinated" value="no" required />
            </label>
          </div>
        </div>
        <div className="question-form">
          <span>
            Please describe your experience of any previous pet ownership and tell us
            about the type of home you plan to offer your new pet.
          </span>
          <textarea id="prevPet" name="prevPet" placeholder="text" required />
        </div>
      </div>
    </div>
  );
}

export default AdoptForm3;
