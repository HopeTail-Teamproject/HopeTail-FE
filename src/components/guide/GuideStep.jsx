import "./guideStep.css";
import footPrint from "/images/foot_print.png";

function GuideStep({ number, title, description }) {
  return (
    <div className="guide">
      <div className="stepNum">
        <img src={footPrint} alt="foot-print" />
        <span className="number">{number}</span>
      </div>
      <div className="stepEx">
        <span className="guide-title">{title}</span>
        <div className="stepBox">
          {description.map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GuideStep;
