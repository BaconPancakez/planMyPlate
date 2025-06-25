import { useState } from 'react';
import RecipePop from './RecipePop.jsx';
import AddRecipe from './AddRecipe.jsx'

import './RecipeList.css';

// Mock data
import data from '../data.js';

// The RecipeList component displays a list of recipes and handles popup interactions
export default function Postbox({ limit = null , showAddBox = true}) {
  const [showPopup, setShowPopup] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState(null);

  const openPopup = (recipe) => {
    setActiveRecipe(recipe);
    setShowPopup(true);
  };

  const openaddPopup = () => {
    setActiveRecipe();
    setShowPopup(true);
  };

  // Use limit if provided
  const recipesToShow = limit ? data.slice(0, limit) : data;

  return (
    <div className="recipes-container">
      {showAddBox && (
       <div className="recipe-box addbox" onClick={() => openaddPopup()}></div>
      )}


      {/* Add Recipe Popup */}
      {showPopup && !activeRecipe && (
        <div className="popup-backdrop" onClick={() => setShowPopup(false)}>
          <div className="popup-container" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              &times;
            </button>
            <AddRecipe />
          </div>
        </div>
      )}

      {/* Recipes */}
      {recipesToShow.map((recipe) => (
        <div
          className="recipe-box"
          key={recipe.id}
          onClick={() => openPopup(recipe)}
        >
          <img src={recipe.image} alt="Recipe" />
          <div className="recipe-details">
            <h3>{recipe.title}</h3>
            <p className="author">By {recipe.author}</p>
            <p className="desc">{recipe.description}</p>
          </div>
        </div>
      ))}

      {/* View Recipe Popup */}
      {showPopup && activeRecipe && (
        <div className="popup-backdrop" onClick={() => setShowPopup(false)}>
          <div className="popup-container" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              <img src="../src/assets/CloseBtn.png" />
            </button>
            <RecipePop recipe={activeRecipe} isMyRecipe={true} />
          </div>
        </div>
      )}
    </div>
  );
}