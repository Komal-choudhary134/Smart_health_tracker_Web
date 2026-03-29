import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import DataEntry from './pages/DataEntry';
import Analysis from './pages/Analysis';
import { saveToStorage, loadFromStorage } from './utils/storage';
import { buildHealthMetrics } from './utils/healthMetrics';
import { upsertHistoryEntry } from './utils/weeklyData';
import './styles/app.css';

function App() {
  const [userData, setUserData] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedData = loadFromStorage();
    if (savedData?.userData) {
      const loadedHistory = savedData.history || [];
      setUserData(savedData.userData);
      setHistory(loadedHistory);
      setMetrics(savedData.metrics || buildHealthMetrics(savedData.userData, { history: loadedHistory }));
    }
  }, []);

  const hasAnalysis = useMemo(() => Boolean(metrics), [metrics]);

  const handleDataSubmit = (formData) => {
    const draftMetrics = buildHealthMetrics(formData, { history });
    const nextHistory = upsertHistoryEntry(history, {
      date: formData.logDate || new Date().toISOString().slice(0, 10),
      diet: draftMetrics?.caloriesConsumed || 0,
      workout: draftMetrics?.caloriesBurned || 0,
    });
    const nextMetrics = buildHealthMetrics(formData, { history: nextHistory });

    setUserData(formData);
    setMetrics(nextMetrics);
    setHistory(nextHistory);
    saveToStorage({ userData: formData, metrics: nextMetrics, history: nextHistory });
  };

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={hasAnalysis ? '/analysis' : '/entry'} replace />}
          />
          <Route
            path="/entry"
            element={<DataEntry userData={userData} onSubmit={handleDataSubmit} />}
          />
          <Route
            path="/analysis"
            element={<Analysis userData={userData} metrics={metrics} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
