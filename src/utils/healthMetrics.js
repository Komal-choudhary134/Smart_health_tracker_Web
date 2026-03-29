import {
  calculateBMI,
  calculateDailyCaloriesNeeded,
  calculateCaloriesBurned,
  parseMealsDetailed,
} from './calculations';
import { generateRecommendations } from './recommendations';
import { buildWeeklyFromHistory, extractManualWeeklyData } from './weeklyData';

export const buildHealthMetrics = (data, options = {}) => {
  if (!data) {
    return null;
  }

  const { history = [] } = options;

  const weight = parseFloat(data.weight);
  const height = parseFloat(data.height);
  const age = parseInt(data.age, 10);
  const steps = parseInt(data.steps || 0, 10);
  const targetSteps = parseInt(data.targetSteps || 10000, 10);
  const workoutMinutes = parseInt(data.workoutMinutes || 0, 10);
  const targetCalories = parseInt(data.targetCalories || 0, 10);
  const hydrationMl = parseInt(data.hydrationMl || 0, 10);
  const hydrationGoalMl = parseInt(data.hydrationGoalMl || 2500, 10);
  const sleepHours = parseFloat(data.sleepHours || 0);
  const sleepGoalHours = parseFloat(data.sleepGoalHours || 8);
  const stressLevel = parseInt(data.stressLevel || 5, 10);
  const restingHeartRate = parseInt(data.restingHeartRate || 72, 10);
  const proteinTarget = parseInt(data.proteinTarget || 90, 10);
  const goalFocus = data.goalFocus || 'maintenance';

  const bmi = calculateBMI(weight, height);
  const caloriesNeeded = calculateDailyCaloriesNeeded(
    data.gender,
    weight,
    height,
    age,
    data.activityLevel
  );
  const caloriesBurned = calculateCaloriesBurned(steps, workoutMinutes, weight);
  const mealInsights = parseMealsDetailed(data.meals);
  const caloriesConsumed = mealInsights.totalCalories;

  const recommendations = generateRecommendations(
    bmi,
    caloriesConsumed,
    caloriesNeeded,
    caloriesBurned,
    steps,
    targetSteps,
    targetCalories,
    {
      hydrationMl,
      hydrationGoalMl,
      sleepHours,
      sleepGoalHours,
      stressLevel,
      restingHeartRate,
    }
  );

  const manualWeekly = extractManualWeeklyData(data);
  const weeklyActivity = manualWeekly || buildWeeklyFromHistory(history, data.logDate);

  return {
    bmi,
    caloriesNeeded,
    caloriesBurned,
    caloriesConsumed,
    targetCalories,
    steps,
    targetSteps,
    recommendations,
    hydrationMl,
    hydrationGoalMl,
    sleepHours,
    sleepGoalHours,
    stressLevel,
    restingHeartRate,
    goalFocus,
    proteinTarget,
    mealBreakdown: mealInsights.meals,
    weeklyActivity,
  };
};
