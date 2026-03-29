import React from 'react';
import { Link } from 'react-router-dom';
import SummaryCards from '../components/SummaryCards';
import RecommendationBox from '../components/RecommendationBox';
import CalorieChart from '../components/CalorieChart';
import WellnessPanel from '../components/WellnessPanel';
import MealBreakdown from '../components/MealBreakdown';
import DailyFocus from '../components/DailyFocus';
import AnalysisSidebar from '../components/AnalysisSidebar';
import ActivityTrendChart from '../components/ActivityTrendChart';

const Analysis = ({ userData, metrics }) => {
  if (!metrics) {
    return (
      <div className="container">
        <div className="empty-state card">
          <div className="empty-state-content">
            <h2>No Analysis Yet</h2>
            <p>Start on the data entry page and submit your profile to generate your dashboard.</p>
            <Link to="/entry" className="submit-btn link-btn">Go To Data Entry</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container analysis-page">
      <div className="analysis-layout">
        <div className="analysis-main">
          <div className="dashboard-hero reveal-up">
            <p className="dashboard-eyebrow">Analysis Window</p>
            <h2>{userData?.name ? `${userData.name}, this is your analysis dashboard` : 'Your analysis dashboard'}</h2>
            <p className="dashboard-intro">
              A complete view of body stats, energy balance, recovery signals, and goal tracking.
            </p>
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

          <ActivityTrendChart weeklyActivity={metrics.weeklyActivity} />

          <DailyFocus
            goalFocus={metrics.goalFocus}
            proteinTarget={metrics.proteinTarget}
            waterGoalMl={metrics.hydrationGoalMl}
            sleepGoalHours={metrics.sleepGoalHours}
          />

          <CalorieChart
            caloriesNeeded={metrics.caloriesNeeded}
            caloriesConsumed={metrics.caloriesConsumed}
            caloriesBurned={metrics.caloriesBurned}
            targetCalories={metrics.targetCalories}
          />

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

        <AnalysisSidebar userData={userData} metrics={metrics} />
      </div>
    </div>
  );
};

export default Analysis;
