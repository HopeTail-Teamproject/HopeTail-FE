import "./adoptForm2.css";
import { useLanguage } from "../../../context/language/LanguageContext";
import { adoptForm2Text } from "../../../lib/adopt";

function AdoptForm2() {
  const { language } = useLanguage();
  const t = adoptForm2Text[language];

  return (
    <div className="adopt-form2">
      <div className="form2-main">
        <div className="question-form">
          <span>{t.question1}</span>
          <textarea id="reason" name="reason" placeholder="text" required />
        </div>
        <div className="question-form">
          <span>
            {t.question2}
          </span>
          <textarea id="family" name="family" placeholder="text" required />
        </div>
        <div className="question-form">
          <span>
            {t.question3}
          </span>
          <textarea id="live" name="live" placeholder="text" required />
        </div>
        <div className="question-form">
          <span>
            {t.question4}
          </span>
          <textarea id="outside" name="outside" placeholder="text" required />
        </div>
        <div className="question-form">
          <span>{t.question5}</span>
          <textarea id="bath" name="bath" placeholder="text" required />
        </div>
      </div>
    </div>
  );
}

export default AdoptForm2;
