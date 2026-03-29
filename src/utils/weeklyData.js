const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const toIsoDate = (value) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 10);
};

const toNumber = (value) => {
  if (value === '' || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

export const extractManualWeeklyData = (data) => {
  const diet = [];
  const workout = [];

  DAY_KEYS.forEach((key) => {
    diet.push(toNumber(data[`weeklyDiet_${key}`]));
    workout.push(toNumber(data[`weeklyWorkout_${key}`]));
  });

  const hasAnyInput = diet.some((v) => v !== null) || workout.some((v) => v !== null);

  if (!hasAnyInput) {
    return null;
  }

  return {
    labels: DAY_LABELS,
    diet: diet.map((v) => Math.max(0, Math.round(v || 0))),
    workout: workout.map((v) => Math.max(0, Math.round(v || 0))),
    source: 'manual',
  };
};

export const upsertHistoryEntry = (history = [], entry) => {
  const entryDate = toIsoDate(entry?.date);
  if (!entryDate) {
    return history;
  }

  const normalized = {
    date: entryDate,
    diet: Math.max(0, Math.round(Number(entry?.diet) || 0)),
    workout: Math.max(0, Math.round(Number(entry?.workout) || 0)),
  };

  const filtered = history.filter((item) => item.date !== entryDate);
  const merged = [...filtered, normalized].sort((a, b) => a.date.localeCompare(b.date));

  // Keep one year of history max.
  return merged.slice(-365);
};

export const buildWeeklyFromHistory = (history = [], anchorDate) => {
  const endDate = toIsoDate(anchorDate) || new Date().toISOString().slice(0, 10);
  const end = new Date(endDate);
  const map = new Map(history.map((item) => [item.date, item]));

  const labels = [];
  const diet = [];
  const workout = [];

  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const day = d.toLocaleDateString(undefined, { weekday: 'short' });
    const item = map.get(iso);

    labels.push(day);
    diet.push(item ? item.diet : 0);
    workout.push(item ? item.workout : 0);
  }

  return { labels, diet, workout, source: 'history' };
};
