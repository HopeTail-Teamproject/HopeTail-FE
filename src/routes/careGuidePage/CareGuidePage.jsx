import GuideStep from "../../components/guide/GuideStep";
import "./careGuidePage.css";
import { careGuidePage } from "../../lib/careGuide";
import { useLanguage } from "../../context/language/LanguageContext";

function CareGuidePage() {
  const { language } = useLanguage();
  const t = careGuidePage;

  return (
    <section className="care-guide">
      <h1 className="title">{language === "kr" ? "케어 가이드" : "Care Guide"}</h1>
      <div className="steps">
        {t.map((items) => (
          <GuideStep
            key={items.number}
            number={items.number}
            title={items.title[language]}
            description={items.description[language]}
          />
        ))}
      </div>
    </section>
  );
}

export default CareGuidePage;
