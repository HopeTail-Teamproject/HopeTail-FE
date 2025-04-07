import "./adoptForm22.css";

function AdoptForm22() {
  return (
    <div className="adopt-form22">
      <div className="form22-main">
        <div className="question-form">
          <span>How much exercise do you think the dog will need?</span>
          <textarea id="exercise" name="exercise" placeholder="text" required />
        </div>
        <div className="question-form">
          <span>
            How do you plan to manage the dog’s meals? (Food, treats, feeding times)
          </span>
          <textarea id="meals" name="meals" placeholder="text" required />
        </div>
        <div className="question-form">
          <span>
            Do you have the financial resources to care for the dog? (e.g., healthcare
            costs, food, toys, training, etc.)
          </span>
          <textarea id="financial" name="financial" placeholder="text" required />
        </div>
        <div className="question-form">
          <span>
            If any behavioral or living issues arise after adoption, how do you plan to
            address them?
          </span>
          <textarea id="issues" name="issues" placeholder="text" required />
        </div>
        <div className="question-form">
          <span>
            How will you take care of the dog during vacations or business trips?
          </span>
          <textarea id="vacations" name="vacations" placeholder="text" required />
        </div>
        <div className="radio-form">
          <span>
            Are you prepared to take responsibility for the dog for over 10 years after
            adoption?
          </span>
          <div className="radio-box">
            <label htmlFor="yes">
              Yes
              <input type="radio" name="responsibility" value="yes" required />
            </label>
            <label htmlFor="no">
              No
              <input type="radio" name="responsibility" value="no" required />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdoptForm22;
