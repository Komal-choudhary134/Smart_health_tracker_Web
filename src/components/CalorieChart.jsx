import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CalorieChart = ({ caloriesNeeded, caloriesConsumed, caloriesBurned, targetCalories }) => {
  const data = {
    labels: ['Base Needed', 'Consumed', 'Burned', 'Target'],
    datasets: [
      {
        label: 'Calories (kcal)',
        data: [
          caloriesNeeded || 0,
          caloriesConsumed || 0,
          caloriesBurned || 0,
          targetCalories || 0
        ],
        backgroundColor: [
          'rgba(0, 201, 167, 0.82)',
          'rgba(255, 118, 87, 0.82)',
          'rgba(34, 102, 255, 0.82)',
          'rgba(255, 188, 66, 0.82)',
        ],
        borderColor: [
          'rgba(0, 153, 127, 1)',
          'rgba(242, 93, 61, 1)',
          'rgba(26, 80, 219, 1)',
          'rgba(247, 164, 32, 1)',
        ],
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: true,
        text: 'Energy Balance Overview',
        font: {
          size: 18,
          family: "'Space Grotesk', sans-serif",
          weight: '700',
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container card">
      <div style={{ height: '300px', width: '100%' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CalorieChart;
