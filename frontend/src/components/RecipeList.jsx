import { useState } from 'react';
import RecipePop from './RecipePop';
import './RecipeList.css';
import data from '../data.js';

export default function RecipeList() {
  const [showPopup, setShowPopup] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState(null);

  const openPopup = (recipe) => {
    setActiveRecipe(recipe);
    setShowPopup(true);
  };

  return (
    <div className="recipes-container">
      {data.map((recipe) => (
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

      {showPopup && activeRecipe && (
        <div className="popup-backdrop" onClick={() => setShowPopup(false)}>
          <div
            className="popup-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              &times;
            </button>
            <RecipePop recipe={activeRecipe} />
          </div>
        </div>
      )}
    </div>
  );
}
