import "./adoptForm2.css";

function AdoptForm2() {
  return (
    <div className="adopt-form2">
      <div className="form2-main">
        <div className="question-form">
          <span>What is the reason you want to adopt a dog?</span>
          <textarea id="reason" name="reason" placeholder="text" required />
        </div>
        <div className="question-form">
          <span>
            Do you have other family members (e.g., other pets, children) living with you?
          </span>
          <textarea id="family" name="family" placeholder="text" required />
        </div>
        <div className="question-form">
          <span>
            Where will the dog live? (House, apartment, house with a yard, etc.)
          </span>
          <textarea id="live" name="live" placeholder="text" required />
        </div>
        <div className="question-form">
          <span>
            How often will the dog be able to go outside? (Walking time and frequency)
          </span>
          <textarea id="outside" name="outside" placeholder="text" required />
        </div>
        <div className="question-form">
          <span>How do you plan to bathe the dog?</span>
          <textarea id="bath" name="bath" placeholder="text" required />
        </div>
      </div>
    </div>
  );
}

export default AdoptForm2;
