import React from 'react';

const InfoCard = ({ title, value, unit, statusClass }) => (
  <div className={`summary-card reveal-up ${statusClass || ''}`}>
    <h3>{title}</h3>
    <div className="value">
      {value} <span className="unit">{unit}</span>
    </div>
  </div>
);

const SummaryCards = ({ 
  bmi, 
  caloriesNeeded, 
  caloriesConsumed, 
  caloriesBurned, 
  targetCalories, 
  steps, 
  targetSteps 
}) => {
  
  const netCalories = caloriesConsumed - caloriesBurned;
  const isGoalMet = targetCalories && Math.abs(netCalories - targetCalories) <= 200;
  
  // Status classes for visual feedback
  const getCalorieStatus = () => {
    if (!targetCalories) return '';
    if (netCalories > targetCalories + 200) return 'warning';
    if (netCalories < targetCalories - 200) return 'warning';
    return 'success';
  };

  const getStepStatus = () => {
    if (steps >= targetSteps) return 'success';
    if (steps >= targetSteps * 0.5) return 'neutral';
    return 'warning';
  };

  const getBmiStatus = () => {
    if (bmi < 18.5) return 'warning'; // underweight
    if (bmi >= 25) return 'warning'; // overweight
    return 'success'; // normal
  };

  return (
    <div className="summary-grid">
      <InfoCard title="BMI" value={bmi || '-'} unit="" statusClass={bmi ? getBmiStatus() : ''} />
      <InfoCard title="Maintenance Calories" value={caloriesNeeded || '-'} unit="kcal" />
      <InfoCard title="Calories Consumed" value={caloriesConsumed || 0} unit="kcal" />
      <InfoCard title="Calories Burned" value={caloriesBurned || 0} unit="kcal" />
      
      {targetCalories > 0 && (
        <>
          <InfoCard title="Daily Target" value={targetCalories} unit="kcal" />
          <InfoCard 
            title="Net vs Target" 
            value={Math.abs(netCalories - targetCalories)} 
            unit={netCalories > targetCalories ? 'kcal over' : 'kcal under'} 
            statusClass={getCalorieStatus()} 
          />
        </>
      )}

      <InfoCard 
        title="Steps Today" 
        value={steps || 0} 
        unit={`/ ${targetSteps || 0}`} 
        statusClass={getStepStatus()} 
      />
      
      <div className={`summary-card goal-status reveal-up ${isGoalMet ? 'success-card' : 'info-card'}`}>
        <h3>Goal Alignment</h3>
        <p>
          {isGoalMet 
            ? "Excellent pace. Your intake and activity are aligned with your target." 
            : targetCalories 
              ? "You are off target today. Use the recovery and recommendation blocks to rebalance."
              : "Set a calorie target to unlock precise goal tracking."}
        </p>
      </div>
    </div>
  );
};

export default SummaryCards;
