import React from 'react';
import { useNavigate } from 'react-router-dom';
import HealthForm from '../components/HealthForm';

const DataEntry = ({ userData, onSubmit }) => {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    onSubmit(formData);
    navigate('/analysis');
  };

  return (
    <div className="container data-entry-page">
      <section className="entry-hero reveal-up">
        <p className="dashboard-eyebrow">Data Entry</p>
        <h2>Enter your health profile and daily log</h2>
        <p>
          Fill your body profile, meals with quantity, hydration, sleep, and activity data.
          Once submitted, your complete analysis opens on the next page.
        </p>
      </section>

      <div className="entry-grid">
        <HealthForm initialData={userData} onSubmit={handleSubmit} />

        <section className="entry-tips card reveal-up">
          <div className="section-head">
            <h3>How to enter better data</h3>
            <span className="section-kicker">Accuracy tips</span>
          </div>
          <ul>
            <li>Use meal amounts like 150g rice, 2x egg, 1.5 chicken curry.</li>
            <li>Set your actual water and sleep targets for realistic recommendations.</li>
            <li>Update stress and resting heart rate for better recovery analysis.</li>
            <li>Pick one clear goal focus: fat loss, muscle gain, maintenance, or endurance.</li>
            <li>Use weekly manual inputs to plot exact Mon-Sun diet/workout values.</li>
            <li>If weekly manual inputs are empty, the app auto-builds weekly graph from your last 7 dated submissions.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default DataEntry;
