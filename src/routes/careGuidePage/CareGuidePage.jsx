import GuideStep from "../../components/guide/GuideStep";
import "./careGuidePage.css";
import { careGuideEn } from "../../lib/careGuide";

function CareGuidePage() {
  return (
    <section className="care-guide">
      <h1 className="title">Care Guide</h1>
      <div className="steps">
        {careGuideEn.map((items) => (
          <GuideStep
            key={items.number}
            number={items.number}
            title={items.title}
            description={items.description}
          />
        ))}
      </div>
    </section>
  );
}

export default CareGuidePage;
