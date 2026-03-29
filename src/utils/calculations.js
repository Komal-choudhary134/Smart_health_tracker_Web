import { foodDatabase } from '../data/foodDatabase';

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export const calculateBMI = (weight, heightCm) => {
  if (!weight || !heightCm) return 0;
  const heightM = heightCm / 100;
  return +(weight / (heightM * heightM)).toFixed(1);
};

export const calculateBMR = (gender, weight, heightCm, age) => {
  if (!weight || !heightCm || !age) return 0;
  // Mifflin-St Jeor Equation
  let bmr = 10 * weight + 6.25 * heightCm - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }
  return bmr;
};

export const calculateDailyCaloriesNeeded = (gender, weight, heightCm, age, activityLevel) => {
  const bmr = calculateBMR(gender, weight, heightCm, age);
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.2;
  return Math.round(bmr * multiplier);
};

export const calculateCaloriesBurned = (steps, workoutMinutes, weight) => {
  // Rough estimate: ~0.04 calories per step for average person, scaled by weight slightly
  const stepCalories = steps * 0.04 * (weight ? weight / 70 : 1);
  // Rough estimate: ~5-10 calories per min of workout, assume moderate: 7
  const workoutCalories = workoutMinutes * 7 * (weight ? weight / 70 : 1);
  return Math.round(stepCalories + workoutCalories);
};

const normalizeFoodName = (value) => value.toLowerCase().trim().replace(/\s+/g, '_');

const findFoodCalorieValue = (rawName) => {
  const exactKey = normalizeFoodName(rawName);
  if (foodDatabase[exactKey]) {
    return { key: exactKey, calories: foodDatabase[exactKey] };
  }

  const keys = Object.keys(foodDatabase);
  const partialMatch = keys.find(
    (key) => key.includes(exactKey) || exactKey.includes(key)
  );

  if (partialMatch) {
    return { key: partialMatch, calories: foodDatabase[partialMatch] };
  }

  return null;
};

const parseSingleMealItem = (mealText) => {
  if (!mealText) {
    return null;
  }

  const raw = mealText.trim().toLowerCase();
  if (!raw) {
    return null;
  }

  let quantity = 1;
  let grams = 0;
  let name = raw;

  const gramsPrefixMatch = raw.match(/^(\d+(?:\.\d+)?)\s?g\s+(.+)$/);
  const gramsSuffixMatch = raw.match(/^(.+?)\s+(\d+(?:\.\d+)?)\s?g$/);
  const quantityPrefixMatch = raw.match(/^(\d+(?:\.\d+)?)\s?x\s+(.+)$/);
  const quantitySuffixXMatch = raw.match(/^(.+?)\s+x\s?(\d+(?:\.\d+)?)$/);
  const quantitySuffixMatch = raw.match(/^(.+?)\s+(\d+(?:\.\d+)?)$/);

  if (gramsPrefixMatch) {
    grams = parseFloat(gramsPrefixMatch[1]);
    name = gramsPrefixMatch[2];
  } else if (gramsSuffixMatch) {
    grams = parseFloat(gramsSuffixMatch[2]);
    name = gramsSuffixMatch[1];
  } else if (quantityPrefixMatch) {
    quantity = parseFloat(quantityPrefixMatch[1]);
    name = quantityPrefixMatch[2];
  } else if (quantitySuffixXMatch) {
    quantity = parseFloat(quantitySuffixXMatch[2]);
    name = quantitySuffixXMatch[1];
  } else if (quantitySuffixMatch) {
    quantity = parseFloat(quantitySuffixMatch[2]);
    name = quantitySuffixMatch[1];
  }

  const found = findFoodCalorieValue(name);
  if (!found) {
    return null;
  }

  const multiplier = grams > 0 ? grams / 100 : quantity;
  const calories = Math.round(found.calories * multiplier);
  const detail = grams > 0 ? `${grams}g` : `${quantity} serving`;

  return {
    key: found.key,
    name: name.trim(),
    detail,
    quantity,
    grams,
    calories,
  };
};

export const parseMealsDetailed = (mealsText) => {
  if (!mealsText || mealsText.trim() === '') {
    return { totalCalories: 0, meals: [] };
  }

  const items = mealsText
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  const meals = items.map(parseSingleMealItem).filter(Boolean);
  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);

  return { totalCalories, meals };
};

export const parseMealsAndCalculateCalories = (mealsText) => {
  const { totalCalories } = parseMealsDetailed(mealsText);
  return totalCalories;
};
