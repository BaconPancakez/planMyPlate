import { useState } from 'react';
import RecipePop from './RecipePop.jsx';
import AddRecipe from './AddRecipe.jsx'

import './RecipeList.css';

// Mock data
import data from '../data.js';

// The RecipeList component displays a list of recipes and handles popup interactions
export default function Postbox() {
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [activeRecipe, setActiveRecipe] = useState(null); // State to store the active recipe

  // Function to open the popup with the selected recipe
  const openPopup = (recipe) => {
    setActiveRecipe(recipe);
    setShowPopup(true);
  };

  const openaddPopup = () => {
    setActiveRecipe();
    setShowPopup(true);
  };



  return (
    <div className="recipes-container"> {/* Container for the list of recipes */}
        <div className = 'recipe-box addbox'
            onClick={() => openaddPopup()} // Opens the popup on click
        >
            <img src= 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png' alt="Add post" /> {/* Add Post image */}
            <div className="recipe-details"> {/* Recipe details */}
                <h3>Add Post</h3>
                
            </div>
        </div>

        {showPopup  && (
        <div className="popup-backdrop" onClick={() => setShowPopup(false)}> {/* Popup backdrop */}
          <div
            className="popup-container" // Popup container
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the popup
          >
            <button className="popup-close" onClick={() => setShowPopup(false)}> {/* Close button */}
              &times;
            </button>
            <AddRecipe  />
          </div>
        </div>
      )}

      {data.map((recipe) => (
        <div
          className="recipe-box" // Individual recipe box
          key={recipe.id}
          onClick={() => openPopup(recipe)} // Opens the popup on click
        >
          <img src={recipe.image} alt="Recipe" /> {/* Recipe image */}
          <div className="recipe-details"> {/* Recipe details */}
            <h3>{recipe.title}</h3>
            <p className="author">By {recipe.author}</p>
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
              &times;
            </button>
            <RecipePop recipe={activeRecipe} />
          </div>
        </div>
      )}
    </div>
  );
}
