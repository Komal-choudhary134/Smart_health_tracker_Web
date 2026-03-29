import React from 'react';

const journalEntries = [
  { title: 'Morning Walk', detail: '30 min | 1.8 km', time: '7:00 AM' },
  { title: 'Water Taken', detail: '2 glasses', time: '7:40 AM' },
  { title: 'Breakfast', detail: 'Boiled egg, fruit bowl', time: '9:00 AM' },
  { title: 'Snack', detail: 'Greek yogurt and nuts', time: '4:15 PM' },
];

const AnalysisSidebar = ({ userData, metrics }) => {
  if (!userData || !metrics) {
    return null;
  }

  return (
    <aside className="analysis-sidebar reveal-up">
      <section className="profile-card card">
        <div className="avatar-circle">{(userData.name || 'U').charAt(0).toUpperCase()}</div>
        <h3>{userData.name}</h3>
        <p>{userData.age} years, India</p>

        <div className="profile-grid">
          <div>
            <span>Weight</span>
            <strong>{userData.weight} kg</strong>
          </div>
          <div>
            <span>Height</span>
            <strong>{userData.height} cm</strong>
          </div>
          <div>
            <span>Goal</span>
            <strong>{metrics.goalFocus.replace('_', ' ')}</strong>
          </div>
        </div>
      </section>

      <section className="journal-card card">
        <div className="section-head">
          <h3>Journals</h3>
          <span className="section-kicker">Today</span>
        </div>
        <div className="journal-list">
          {journalEntries.map((entry) => (
            <article key={entry.title} className="journal-item">
              <h4>{entry.title}</h4>
              <p>{entry.detail}</p>
              <span>{entry.time}</span>
            </article>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default AnalysisSidebar;
