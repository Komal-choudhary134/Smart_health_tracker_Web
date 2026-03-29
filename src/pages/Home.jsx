import React, { useState, useEffect } from 'react';
import HealthForm from '../components/HealthForm';
import SummaryCards from '../components/SummaryCards';
import RecommendationBox from '../components/RecommendationBox';
import CalorieChart from '../components/CalorieChart';
import WellnessPanel from '../components/WellnessPanel';
import MealBreakdown from '../components/MealBreakdown';
import DailyFocus from '../components/DailyFocus';

import {
  calculateBMI,
  calculateDailyCaloriesNeeded,
  calculateCaloriesBurned,
  parseMealsDetailed
} from '../utils/calculations';

import { generateRecommendations } from '../utils/recommendations';
import { saveToStorage, loadFromStorage } from '../utils/storage';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [metrics, setMetrics] = useState(null);

  // Load from storage on mount
  useEffect(() => {
    const savedData = loadFromStorage();
    if (savedData && savedData.userData) {
      setUserData(savedData.userData);
      recalculateMetrics(savedData.userData);
    }
  }, []);

  const recalculateMetrics = (data) => {
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
    const caloriesNeeded = calculateDailyCaloriesNeeded(data.gender, weight, height, age, data.activityLevel);
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

    const newMetrics = {
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
    };

    setMetrics(newMetrics);
    
    // Save state
    saveToStorage({ userData: data, metrics: newMetrics });
  };

  const handleFormSubmit = (formData) => {
    setUserData(formData);
    recalculateMetrics(formData);
  };

  return (
    <div className="home-page container">
      <div className="layout-grid">
        <div className="sidebar">
          <HealthForm initialData={userData} onSubmit={handleFormSubmit} />
        </div>
        
        <div className="main-content">
          {metrics ? (
            <div className="dashboard-view">
              <div className="dashboard-hero reveal-up">
                <p className="dashboard-eyebrow">Daily performance dashboard</p>
                <h2>{userData?.name ? `${userData.name}, here is your health snapshot` : 'Your personalized health snapshot'}</h2>
                <p className="dashboard-intro">A modern all-in-one tracker for calories, activity, hydration, sleep, and readiness.</p>
              </div>

              <SummaryCards 
                bmi={metrics.bmi}
                caloriesNeeded={metrics.caloriesNeeded}
                caloriesConsumed={metrics.caloriesConsumed}
                caloriesBurned={metrics.caloriesBurned}
                targetCalories={metrics.targetCalories}
                steps={metrics.steps}
                targetSteps={metrics.targetSteps}
              />

              <DailyFocus
                goalFocus={metrics.goalFocus}
                proteinTarget={metrics.proteinTarget}
                waterGoalMl={metrics.hydrationGoalMl}
                sleepGoalHours={metrics.sleepGoalHours}
              />

              <div className="visualization-section">
                <CalorieChart 
                  caloriesNeeded={metrics.caloriesNeeded}
                  caloriesConsumed={metrics.caloriesConsumed}
                  caloriesBurned={metrics.caloriesBurned}
                  targetCalories={metrics.targetCalories}
                />
              </div>

              <WellnessPanel
                hydrationMl={metrics.hydrationMl}
                hydrationGoalMl={metrics.hydrationGoalMl}
                sleepHours={metrics.sleepHours}
                sleepGoalHours={metrics.sleepGoalHours}
                stressLevel={metrics.stressLevel}
                restingHeartRate={metrics.restingHeartRate}
              />

              <MealBreakdown meals={metrics.mealBreakdown} />

              <RecommendationBox recommendations={metrics.recommendations} />
            </div>
          ) : (
            <div className="empty-state card">
              <div className="empty-state-content">
                <h2>Build Your Modern Health Dashboard</h2>
                <p>Enter your profile, food quantities, movement, hydration, and recovery data to generate a vivid analytics view.</p>
                <div className="empty-icon">Pulse</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
