import "./formDone.css";
import { useLanguage } from "../../../context/language/LanguageContext";
import { adoptForm4Text } from "../../../lib/adopt";

function FormDone() {
  const { language } = useLanguage();
  const t = adoptForm4Text[language];

  return (
    <div className="form-done">
      <span>{t.first}</span>
      <span>
        {t.second}
      </span>
    </div>
  );
}

export default FormDone;
