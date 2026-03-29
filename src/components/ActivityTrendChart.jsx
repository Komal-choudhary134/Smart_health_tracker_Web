import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const ActivityTrendChart = ({ weeklyActivity }) => {
  const labels = weeklyActivity?.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dietSeries = weeklyActivity?.diet || [0, 0, 0, 0, 0, 0, 0];
  const workoutSeries = weeklyActivity?.workout || [0, 0, 0, 0, 0, 0, 0];
  const sourceLabel = weeklyActivity?.source === 'manual' ? 'Manual weekly input' : 'Last 7 days (auto history)';

  const data = {
    labels,
    datasets: [
      {
        label: 'Diet',
        data: dietSeries,
        borderColor: 'rgba(34, 102, 255, 1)',
        backgroundColor: 'rgba(34, 102, 255, 0.16)',
        fill: true,
        tension: 0.45,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Workout',
        data: workoutSeries,
        borderColor: 'rgba(236, 72, 153, 1)',
        backgroundColor: 'rgba(236, 72, 153, 0.16)',
        fill: true,
        tension: 0.45,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            family: "'Manrope', sans-serif",
            weight: '700',
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(16, 33, 61, 0.1)',
        },
        ticks: {
          color: 'rgba(47, 64, 96, 0.75)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(47, 64, 96, 0.75)',
        },
      },
    },
  };

  return (
    <section className="activity-trend card reveal-up">
      <div className="section-head">
        <h3>Activity Statistics</h3>
          <span className="section-kicker">{sourceLabel}</span>
      </div>
      <div className="activity-trend-canvas">
        <Line data={data} options={options} />
      </div>
    </section>
  );
};

export default ActivityTrendChart;
