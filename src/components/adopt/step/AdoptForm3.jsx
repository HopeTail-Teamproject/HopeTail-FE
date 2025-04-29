import "./adoptForm3.css";
import { useLanguage } from "../../../context/language/LanguageContext";
import { adoptForm3Text } from "../../../lib/adopt";

function AdoptForm3() {
  const { language } = useLanguage();
  const t = adoptForm3Text[language];

  return (
    <div className="adopt-form3">
      <div className="form3-main">
        <div className="radio-form">
          <span>{t.question1}</span>
          <div className="radio-box">
            <label htmlFor="yes">
              {t.yes}
              <input type="radio" name="otherAnimal" value="yes" required />
            </label>
            <label htmlFor="no">
              {t.no}
              <input type="radio" name="otherAnimal" value="no" required />
            </label>
          </div>
        </div>
        <div className="question-form">
          <span>{t.question2}</span>
          <textarea
            id="otherAnimalState"
            name="otherAnimalState"
            placeholder="text"
            required
          />
        </div>
        <div className="radio-form">
          <span>{t.question3}</span>
          <div className="radio-box">
            <label htmlFor="yes">
              {t.yes}
              <input type="radio" name="neutered" value="yes" required />
            </label>
            <label htmlFor="no">
              {t.no}
              <input type="radio" name="neutered" value="no" required />
            </label>
          </div>
        </div>
        <div className="radio-form">
          <span>{t.question4}</span>
          <div className="radio-box">
            <label htmlFor="yes">
              {t.yes}
              <input type="radio" name="vaccinated" value="yes" required />
            </label>
            <label htmlFor="no">
              {t.no}
              <input type="radio" name="vaccinated" value="no" required />
            </label>
          </div>
        </div>
        <div className="question-form">
          <span>
            {t.question5}
          </span>
          <textarea id="prevPet" name="prevPet" placeholder="text" required />
        </div>
      </div>
    </div>
  );
}

export default AdoptForm3;
