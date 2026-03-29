import React from 'react';

const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value));

const ProgressItem = ({ label, value, target, unit, tone = 'teal' }) => {
  const percent = target > 0 ? clamp((value / target) * 100) : 0;

  return (
    <div className="progress-item">
      <div className="progress-meta">
        <p>{label}</p>
        <strong>
          {value}
          {unit} / {target}
          {unit}
        </strong>
      </div>
      <div className="progress-track">
        <div className={`progress-fill ${tone}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

const WellnessPanel = ({ hydrationMl, hydrationGoalMl, sleepHours, sleepGoalHours, stressLevel, restingHeartRate }) => {
  const stressLabel = stressLevel <= 3 ? 'Low' : stressLevel <= 6 ? 'Moderate' : 'High';

  return (
    <section className="wellness-panel card reveal-up">
      <div className="section-head">
        <h3>Recovery and Wellness</h3>
        <span className="section-kicker">Daily body signals</span>
      </div>

      <div className="wellness-grid">
        <ProgressItem
          label="Hydration"
          value={hydrationMl}
          target={hydrationGoalMl}
          unit="ml"
          tone="teal"
        />
        <ProgressItem
          label="Sleep"
          value={sleepHours}
          target={sleepGoalHours}
          unit="h"
          tone="orange"
        />
      </div>

      <div className="wellness-stats">
        <article className="wellness-stat-card">
          <p>Stress Level</p>
          <h4>{stressLabel}</h4>
          <span>{stressLevel} / 10</span>
        </article>
        <article className="wellness-stat-card">
          <p>Resting Heart Rate</p>
          <h4>{restingHeartRate} bpm</h4>
          <span>Morning baseline</span>
        </article>
      </div>
    </section>
  );
};

export default WellnessPanel;
