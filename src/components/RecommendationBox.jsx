import React from 'react';

const RecommendationBox = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="recommendation-box card reveal-up">
      <div className="section-head">
        <h3>Smart Recommendations</h3>
        <span className="section-kicker">Actionable next steps</span>
      </div>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index} className="recommendation-item">
            <span className="icon">💡</span> {rec}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationBox;
