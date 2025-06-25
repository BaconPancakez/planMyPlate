// components/RecipeCard.jsx
import React from 'react';
import './RecipeCard.css'; // Import the CSS file directly

export default function RecipeCard({ recipe, isChecked, onToggleCheck, onView, onDelete }) {
  return (
    <div className="rc-card">
      <div className="rc-checkbox-div">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggleCheck}
          className="rc-checkbox"
        />
      </div>
      <img src={recipe.image} alt={recipe.title} className="rc-image" />
      <div className="rc-info">
        <h3 className="rc-title">{recipe.title}</h3>
        {/* Only show warning if it exists */}
        {recipe.warning && <p className="rc-warning">⚠️ {recipe.warning}</p>}
      </div>
      <div className="rc-actions">
        <button onClick={onView} className="rc-view-btn">👀 View Recipe</button>
        <button onClick={onDelete} className="rc-delete-btn">🗑 Delete</button>
      </div>
    </div>
  );
};
