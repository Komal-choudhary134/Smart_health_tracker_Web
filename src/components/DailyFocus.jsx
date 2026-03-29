import React from 'react';

const DailyFocus = ({ goalFocus, proteinTarget, waterGoalMl, sleepGoalHours }) => {
  return (
    <section className="daily-focus card reveal-up">
      <div className="section-head">
        <h3>Today Focus Plan</h3>
        <span className="section-kicker">Standard health tracker essentials</span>
      </div>

      <div className="focus-chip-row">
        <span className="focus-chip">Goal: {goalFocus}</span>
        <span className="focus-chip">Protein: {proteinTarget} g</span>
        <span className="focus-chip">Water: {waterGoalMl} ml</span>
        <span className="focus-chip">Sleep: {sleepGoalHours} h</span>
      </div>

      <div className="checklist-grid">
        <div className="check-item">
          <span className="check-dot" />
          <p>Log every meal with amount before evening.</p>
        </div>
        <div className="check-item">
          <span className="check-dot" />
          <p>Split water goal into 4 hydration blocks.</p>
        </div>
        <div className="check-item">
          <span className="check-dot" />
          <p>Keep a 30 minute activity window today.</p>
        </div>
        <div className="check-item">
          <span className="check-dot" />
          <p>Reduce late-night screen time for sleep quality.</p>
        </div>
      </div>
    </section>
  );
};

export default DailyFocus;
