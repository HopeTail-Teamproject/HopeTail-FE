import "./adoptForm22.css";
import { useLanguage } from "../../../context/language/LanguageContext";
import { adoptForm22Text } from "../../../lib/adopt";

function AdoptForm22() {
  const { language } = useLanguage();
  const t = adoptForm22Text[language];

  return (
    <div className="adopt-form22">
      <div className="form22-main">
        <div className="question-form">
          <span>{t.question1}</span>
          <textarea id="exercise" name="exercise" placeholder="text" required />
        </div>
        <div className="question-form">
          <span>
            {t.question2}
          </span>
          <textarea id="meals" name="meals" placeholder="text" required />
        </div>
        <div className="question-form">
          <span>
            {t.question3}
          </span>
          <textarea id="financial" name="financial" placeholder="text" required />
        </div>
        <div className="question-form">
          <span>
            {t.question4}
          </span>
          <textarea id="issues" name="issues" placeholder="text" required />
        </div>
        <div className="question-form">
          <span>
            {t.question5}
          </span>
          <textarea id="vacations" name="vacations" placeholder="text" required />
        </div>
        <div className="radio-form">
          <span>
            {t.question6}
          </span>
          <div className="radio-box">
            <label htmlFor="yes">
              {language === 'kr' ? '예' : 'Yes'}
              <input type="radio" name="responsibility" value="yes" required />
            </label>
            <label htmlFor="no">
              {language === 'kr' ? '아니오' : 'No'}
              <input type="radio" name="responsibility" value="no" required />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdoptForm22;
