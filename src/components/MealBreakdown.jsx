import React from 'react';

const MealBreakdown = ({ meals = [] }) => {
  if (!meals.length) {
    return (
      <section className="meal-breakdown card reveal-up">
        <div className="section-head">
          <h3>Meal Breakdown</h3>
          <span className="section-kicker">Portion-aware calories</span>
        </div>
        <p className="muted-text">Add meals with quantity in the form, for example: 150g rice, 2x egg, 1.5 chicken curry.</p>
      </section>
    );
  }

  return (
    <section className="meal-breakdown card reveal-up">
      <div className="section-head">
        <h3>Meal Breakdown</h3>
        <span className="section-kicker">Portion-aware calories</span>
      </div>
      <div className="meal-list">
        {meals.map((meal, index) => (
          <article key={`${meal.name}-${index}`} className="meal-item">
            <div>
              <h4>{meal.name}</h4>
              <p>{meal.detail}</p>
            </div>
            <strong>{meal.calories} kcal</strong>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MealBreakdown;
