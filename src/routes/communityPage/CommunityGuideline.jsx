import React from 'react';
import './CommunityGuideline.css';
import { useLanguage } from '../../context/language/LanguageContext';

const CommunityGuideline = () => {
  const { language } = useLanguage();

  return (
    <div className="guideline-wrapper">
      <div className="guideline-title-wrapper">
        <h2 className="guideline-title">Community Guide</h2>
        <div className="guideline-title-underline"></div>
      </div>

      <div className="guideline-container">
        <div className="guideline-box">
          <div className="guideline-flex">
            <div className="guideline-text">
              <h3>Hopetail Community Guidelines</h3>
              <p>
                Welcome to the Hopetail community! We’re thrilled to have you join us in supporting stray dogs and helping them find loving homes.
                To ensure a respectful, safe, and productive environment for all members, please follow these guidelines.
              </p>
              <ol>
                <li>
                  <strong>Be Respectful and Kind</strong>
                  <ul>
                    <li>Treat all members with respect and kindness. The community thrives on positive interactions and mutual support.</li>
                    <li>Avoid using offensive language, insults, or hate speech. Discrimination or harmful behavior of any kind will not be tolerated.</li>
                  </ul>
                </li>
                <li>
                  <strong>Share Valuable and Relevant Information</strong>
                  <ul>
                    <li>Share posts that are relevant to stray dog adoption, welfare, and related topics.</li>
                    <li>Please provide helpful information, personal experiences, or resources that can benefit others.</li>
                  </ul>
                </li>
                <li>
                  <strong>No Spamming or Self-Promotion</strong>
                  <ul>
                    <li>Refrain from posting irrelevant or excessive advertisements, promotions, or links to external websites.</li>
                    <li>Keep the focus on the purpose of this community: helping stray dogs and supporting adopters and shelters.</li>
                  </ul>
                </li>
                <li>
                  <strong>Respect Privacy</strong>
                  <ul>
                    <li>Do not share personal information (such as addresses, phone numbers, etc.) of others without their permission.</li>
                    <li>Respect others’ privacy and ensure that all posts are shared with the consent of those involved.</li>
                  </ul>
                </li>
                <li>
                  <strong>Supportive and Constructive Feedback</strong>
                  <ul>
                    <li>If you offer advice or feedback, ensure it is constructive and supportive.</li>
                    <li>If discussing adoption experiences or offering suggestions, be mindful of different perspectives and always aim to help, not criticize.</li>
                  </ul>
                </li>
                <li>
                  <strong>Report Inappropriate Content</strong>
                  <ul>
                    <li>If you come across any posts that violate our guidelines or appear harmful, please report them to the moderators.</li>
                    <li>We want to ensure a safe and welcoming environment for all.</li>
                  </ul>
                </li>
                <li>
                  <strong>Be Mindful of Adoptable Pets</strong>
                  <ul>
                    <li>When discussing pets available for adoption, please ensure that all information is accurate and up-to-date.</li>
                    <li>Avoid making jokes or comments that could be considered disrespectful towards animals or the adoption process.</li>
                  </ul>
                </li>
                <li>
                  <strong>Enjoy and Engage!</strong>
                  <ul>
                    <li>Participate in discussions, share your stories, ask questions, and offer support.</li>
                    <li>Engage with fellow members in a friendly and caring manner to help our community grow.</li>
                  </ul>
                </li>
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
