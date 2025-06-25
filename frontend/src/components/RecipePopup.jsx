// components/RecipePopup.jsx
import React from 'react';
import "./RecipePopup.css";

// The RecipePopup component displays detailed information about a selected recipe
// It now receives both the recipe data and an onClose function from its parent.
export default function RecipePopup({ recipe, onClose }) {
  // Defensive check: If no recipe is provided, don't render anything
  if (!recipe) return null;

  // Helper function to format ingredient for display
  // This ensures ingredients from objects are displayed as desired strings (e.g., "195g Butter")
  const formatIngredientForDisplay = (ingredient) => {
    const { quantity, unit, name } = ingredient;

    if (unit === 'numbers') {
        // Simple pluralization for numbers. Will try to add 's' if not ending in s/es
        return `${quantity} ${name}${quantity > 1 && !name.toLowerCase().endsWith('s') && !name.toLowerCase().endsWith('es') ? 's' : ''}`;
    } else if (unit === 'grams' || unit === 'ml') {
        return `${quantity}${unit} ${name}`;
    }
    // Fallback if unit is somehow not one of the three (shouldn't happen with standardized data)
    return `${quantity} ${unit} ${name}`;
  };

  return (
    // The outermost container: the fixed backdrop that covers the entire screen
    <div className="popup-backdrop">
      {/* The inner container for the popup content, often used for scrolling or max-width */}
      <div className="popup-container">
        {/* Close Button: Positioned absolutely within the popup-container for proper placement */}
        <button className="popup-close" onClick={onClose}>✖</button>

        {/* The actual styled content box for the recipe details */}
        <div className="recipe-popup">
          <div className="recipe-header">
            <h1>{recipe.title}</h1>
            {recipe.author && <p className="rp-popup-author">By: {recipe.author}</p>}

            {/* Displaying Stats: Adjusted to use 'protein' and 'calories' from actual data */}
            {recipe.stats && (
              <>
                <div className="stats">
                    <p>Cuisine: {recipe.stats.cuisine}</p>
                    <span className="bar">|</span>
                    <p>Protein: {recipe.stats.protein}</p>
                    <span className="bar">|</span>
                    <p>Calories: {recipe.stats.calories}</p>
                </div>
                <div className="stats">
                  <p>Prep Time: {recipe.stats.prepTime}</p>
                  <span className="bar">|</span>
                  <p>Cook Time: {recipe.stats.cookTime}</p>
                  <span className="bar">|</span>
                  <p>Total Time: {recipe.stats.totalTime}</p>
                </div>
              </>
            )}
          </div>

          <div className="recipe-main">
            <div className="left-bar">
              <img
                src={recipe.image}
                alt={recipe.title}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/280x200/CCCCCC/000000?text=No+Img'; }}
              />
              <h2>Ingredients</h2>
              {recipe.ingredients && recipe.ingredients.length > 0 ? (
                <ul>
                  {recipe.ingredients.map((item, index) => (
                    <li key={item.id || index}>{formatIngredientForDisplay(item)}</li>
                  ))}
                </ul>
              ) : (
                <p>No ingredients listed for this recipe.</p>
              )}
            </div>

            <div className="right-bar">
              <h2>Directions</h2>
              {recipe.directions && recipe.directions.length > 0 ? (
                <ol>
                  {recipe.directions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p>No directions provided for this recipe.</p>
              )}
            </div>
          </div>
        </div> {/* End recipe-popup */}
      </div> {/* End popup-container */}
    </div> // End popup-backdrop
  );
}