export const generateRecommendations = (
  bmi,
  caloriesConsumed,
  caloriesNeeded,
  caloriesBurned,
  steps,
  targetSteps,
  targetCaloriesFromForm,
  wellness = {}
) => {
  const reps = [];
  const {
    hydrationMl = 0,
    hydrationGoalMl = 2500,
    sleepHours = 0,
    sleepGoalHours = 8,
    stressLevel = 5,
    restingHeartRate = 72,
  } = wellness;

  // BMI insights
  if (bmi < 18.5) {
    reps.push('Your BMI indicates you are underweight. Consider increasing your healthy caloric intake and adding strength training.');
  } else if (bmi >= 25) {
    reps.push('Your BMI is slightly high. Focus on a balanced diet and regular cardiovascular exercise.');
  } else if (bmi >= 18.5 && bmi < 25) {
    reps.push('Great job! Your BMI is in the normal, healthy range.');
  }

  // Calorie insights
  const targetCals = targetCaloriesFromForm || caloriesNeeded;
  const netCalories = caloriesConsumed - caloriesBurned;

  if (caloriesConsumed < targetCals * 0.8) {
    reps.push('You are consuming noticeably fewer calories than your target. Ensure you are getting enough nutrients.');
  } else if (caloriesConsumed > targetCals * 1.2) {
    reps.push('Your caloric intake is exceeding your goals. Try incorporating more low-calorie, high-volume foods like vegetables.');
  } else {
    reps.push('Your caloric intake is well-aligned with your daily goals. Keep it up!');
  }

  // Step insights
  if (steps < targetSteps * 0.5) {
    reps.push(`You've achieved less than half your step goal (${targetSteps}). Try taking a brief walk!`);
  } else if (steps >= targetSteps) {
    reps.push('Fantastic! You have reached or exceeded your daily step goal.');
  } else {
    reps.push(`You are getting closer to your step target of ${targetSteps}. A short stroll will help you hit it.`);
  }

  // Recovery and wellness insights
  if (hydrationMl < hydrationGoalMl * 0.7) {
    reps.push('Hydration is below your target. Keep a bottle nearby and add 2-3 hydration breaks in your day.');
  } else {
    reps.push('Hydration is in a healthy range. Good job maintaining your water intake.');
  }

  if (sleepHours < sleepGoalHours) {
    reps.push('You are under your sleep goal. Try winding down 30 minutes earlier and reduce late screen exposure.');
  } else {
    reps.push('Sleep duration is aligned with your target, which supports recovery and better appetite control.');
  }

  if (stressLevel >= 7) {
    reps.push('Stress levels are elevated. Consider 5 minutes of breathing or a short walk to regulate your nervous system.');
  }

  if (restingHeartRate > 82) {
    reps.push('Resting heart rate is a bit high today. Prioritize hydration, gentle movement, and restorative sleep.');
  }

  return reps;
};
