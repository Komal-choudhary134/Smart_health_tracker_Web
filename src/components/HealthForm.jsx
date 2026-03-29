import React, { useState, useEffect } from 'react';

const WEEK_DAYS = [
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' },
];

const getTodayIso = () => new Date().toISOString().slice(0, 10);

const HealthForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    logDate: getTodayIso(),
    name: '',
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    steps: '',
    workoutMinutes: '',
    activityLevel: 'sedentary',
    targetCalories: '',
    targetSteps: '10000',
    meals: '',
    hydrationMl: '0',
    hydrationGoalMl: '2500',
    sleepHours: '7',
    sleepGoalHours: '8',
    stressLevel: '5',
    restingHeartRate: '72',
    proteinTarget: '90',
    goalFocus: 'fat_loss',
    weeklyDiet_mon: '',
    weeklyWorkout_mon: '',
    weeklyDiet_tue: '',
    weeklyWorkout_tue: '',
    weeklyDiet_wed: '',
    weeklyWorkout_wed: '',
    weeklyDiet_thu: '',
    weeklyWorkout_thu: '',
    weeklyDiet_fri: '',
    weeklyWorkout_fri: '',
    weeklyDiet_sat: '',
    weeklyWorkout_sat: '',
    weeklyDiet_sun: '',
    weeklyWorkout_sun: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="health-form-container card">
      <h2>Health Command Center</h2>
      <p className="form-subtitle">Build your daily profile with nutrition, movement, and recovery signals.</p>
      <form onSubmit={handleSubmit} className="health-form">
        <div className="section-title">Entry Date</div>
        <div className="form-group">
          <label htmlFor="logDate">Log Date</label>
          <input type="date" id="logDate" name="logDate" value={formData.logDate} onChange={handleChange} required />
        </div>

        <div className="section-title">Profile Basics</div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} min="1" required />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} step="0.1" min="1" required />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height (cm)</label>
            <input type="number" id="height" name="height" value={formData.height} onChange={handleChange} min="50" required />
          </div>
        </div>

        <div className="section-title">Activity</div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="steps">Steps Walked Today</label>
            <input type="number" id="steps" name="steps" value={formData.steps} onChange={handleChange} min="0" />
          </div>
          <div className="form-group">
            <label htmlFor="workoutMinutes">Workout (Minutes)</label>
            <input type="number" id="workoutMinutes" name="workoutMinutes" value={formData.workoutMinutes} onChange={handleChange} min="0" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="activityLevel">Daily Activity Level</label>
          <select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
            <option value="sedentary">Sedentary (Little to no exercise)</option>
            <option value="light">Light (Light exercise 1-3 days/week)</option>
            <option value="moderate">Moderate (Moderate exercise 3-5 days/week)</option>
            <option value="active">Active (Hard exercise 6-7 days/week)</option>
            <option value="very_active">Very Active (Very hard exercise/sports & physical job)</option>
          </select>
        </div>

        <div className="section-title">Goals and Nutrition</div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="goalFocus">Primary Goal</label>
            <select id="goalFocus" name="goalFocus" value={formData.goalFocus} onChange={handleChange}>
              <option value="fat_loss">Fat Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
              <option value="endurance">Endurance</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="proteinTarget">Protein Target (g)</label>
            <input type="number" id="proteinTarget" name="proteinTarget" value={formData.proteinTarget} onChange={handleChange} min="20" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="targetCalories">Daily Calorie Goal (Optional)</label>
            <input type="number" id="targetCalories" name="targetCalories" value={formData.targetCalories} onChange={handleChange} min="500" placeholder="e.g. 2000" />
          </div>
          <div className="form-group">
            <label htmlFor="targetSteps">Target Steps</label>
            <input type="number" id="targetSteps" name="targetSteps" value={formData.targetSteps} onChange={handleChange} min="1000" required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="meals">Meals with Amount (Comma-separated)</label>
          <textarea 
            id="meals" 
            name="meals" 
            value={formData.meals} 
            onChange={handleChange} 
            placeholder="e.g. 150g rice, 2x egg, 1.5 chicken curry"
            rows="3"
          ></textarea>
          <small className="field-help">Use quantity format like 2x food or 150g food for better calorie estimates.</small>
        </div>

        <div className="section-title">Recovery and Vitals</div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="hydrationMl">Water Intake Today (ml)</label>
            <input type="number" id="hydrationMl" name="hydrationMl" value={formData.hydrationMl} onChange={handleChange} min="0" />
          </div>
          <div className="form-group">
            <label htmlFor="hydrationGoalMl">Water Goal (ml)</label>
            <input type="number" id="hydrationGoalMl" name="hydrationGoalMl" value={formData.hydrationGoalMl} onChange={handleChange} min="500" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="sleepHours">Sleep Last Night (hours)</label>
            <input type="number" id="sleepHours" name="sleepHours" value={formData.sleepHours} onChange={handleChange} min="0" max="14" step="0.5" />
          </div>
          <div className="form-group">
            <label htmlFor="sleepGoalHours">Sleep Goal (hours)</label>
            <input type="number" id="sleepGoalHours" name="sleepGoalHours" value={formData.sleepGoalHours} onChange={handleChange} min="5" max="12" step="0.5" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="stressLevel">Stress Level (1-10)</label>
            <input type="number" id="stressLevel" name="stressLevel" value={formData.stressLevel} onChange={handleChange} min="1" max="10" />
          </div>
          <div className="form-group">
            <label htmlFor="restingHeartRate">Resting Heart Rate (bpm)</label>
            <input type="number" id="restingHeartRate" name="restingHeartRate" value={formData.restingHeartRate} onChange={handleChange} min="35" max="160" />
          </div>
        </div>

        <div className="section-title">Weekly Manual Entry (Optional)</div>
        <p className="form-subtitle">Enter exact kcal values for each day to override auto-history weekly graph.</p>
        <div className="weekly-entry-grid">
          <div className="weekly-entry-head">Day</div>
          <div className="weekly-entry-head">Diet (kcal)</div>
          <div className="weekly-entry-head">Workout (kcal)</div>

          {WEEK_DAYS.map((day) => (
            <React.Fragment key={day.key}>
              <div className="weekly-day-label">{day.label}</div>
              <input
                type="number"
                name={`weeklyDiet_${day.key}`}
                value={formData[`weeklyDiet_${day.key}`]}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
              <input
                type="number"
                name={`weeklyWorkout_${day.key}`}
                value={formData[`weeklyWorkout_${day.key}`]}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </React.Fragment>
          ))}
        </div>

        <button type="submit" className="submit-btn">Generate Smart Dashboard</button>
      </form>
    </div>
  );
};

export default HealthForm;
