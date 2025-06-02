import React from 'react';
import './CommunityGuideline.css';
import { useLanguage } from '../../context/language/LanguageContext';
import communityGuidelineText from '../../lib/i18n/communityGuideline';

const CommunityGuideline = () => {
  const { language } = useLanguage();
  const text = communityGuidelineText[language] || communityGuidelineText["en"];

  return (
    <div className="guideline-wrapper">
      <div className="guideline-title-wrapper">
        <h2 className="guideline-title">{text.title}</h2>
        <div className="guideline-title-underline"></div>
      </div>

      <div className="guideline-container">
        <div className="guideline-box">
          <div className="guideline-flex">
            <div className="guideline-text">
              <h3>{text.headline}</h3>
              <p>{text.intro}</p>
              <ol>
                {text.rules.map((rule, idx) => (
                  <li key={idx}>
                    <strong>{rule.title}</strong>
                    <ul>
                      {rule.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>

            <div className="guideline-image">
              <img
                src="/HopeTail-FE/images/dog_walk.png"
                alt="dog"
                className="guideline-dog-pic"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityGuideline;
