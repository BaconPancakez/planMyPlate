// Importing necessary libraries, components, and styles
import { useState } from 'react';
import RecipePop from './RecipePop';

import './RecipeList.css';

// The RecipeList component displays a list of recipes and handles popup interactions
export default function RecipeList({ recipes }) {
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [activeRecipe, setActiveRecipe] = useState(null); // State to store the active recipe

  // Function to open the popup with the selected recipe
  const openPopup = (recipe) => {
    setActiveRecipe(recipe);
    setShowPopup(true);
  };

  if (!recipes) {
    return <div>Loading...</div>;
  }

  if (recipes.length === 0) {
    return <div>No recipes found.</div>;
  }

  return (
    <div className="recipes-container"> {/* Container for the list of recipes */}
      {recipes.map((recipe) => (
        <div
          className="recipe-box" // Individual recipe box
          key={recipe.id}
          onClick={() => openPopup(recipe)} // Opens the popup on click
        >
          <img src={recipe.image} alt="Recipe" /> {/* Recipe image */}
          <div className="recipe-details"> {/* Recipe details */}
            <h3>{recipe.title}</h3>
            <p className="author">By {recipe.username}</p>
            <p className="desc">{recipe.description}</p>
          </div>
        </div>
      ))}

      {showPopup && activeRecipe && (
        <div className="popup-backdrop" onClick={() => setShowPopup(false)}> {/* Popup backdrop */}
          <div
            className="popup-container" // Popup container
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the popup
          >
            <button className="popup-close" onClick={() => setShowPopup(false)}> {/* Close button */}
              <img src="../src/assets/CloseBtn.png"/>
            </button>
            { <RecipePop recipe={activeRecipe} isMyRecipe={false}/> }
          </div>
        </div>
      )}
    </div>
  );
}
