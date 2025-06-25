import { useEffect, useState } from 'react';
import RecipePop from './RecipePop.jsx';
import AddRecipe from './AddRecipe.jsx';

import './RecipeList.css';

// Mock data
// import data from '../data.js';

// The RecipeList component displays a list of recipes and handles popup interactions
export default function Postbox({ profileId}) {
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [activeRecipe, setActiveRecipe] = useState(null); // State to store the active recipe
  const [recipes, setRecipes] = useState([]); // State to store the list of recipes
  const [loading, setLoading] = useState(true); // State to indicate loading state

  // Function to open the popup with the selected recipe
  const openPopup = (recipe) => {
    setActiveRecipe(recipe);
    setShowPopup(true);
  };

  const openaddPopup = () => {
    setActiveRecipe();
    setShowPopup(true);
  };

  // Fetch recipes from the backend
  useEffect(() => {
    fetch(`http://localhost:8080/user-recipes/${profileId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRecipes(data.recipes);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [profileId]);

  if (loading) return <div>Loading...</div>;

  // Function to get the recipe ID
  const getRecipeID = (recipe) => {
    return recipe.Recipe_id || recipe.id  || recipe._id || null;
  }

  // Delete handler
  const handleDeleteRecipe = async (recipe) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    try {
      const id = {recipe.id};
      if (!id) {
        alert('No recipe id found!');
        return;
      } 
      const response = await fetch(`http://localhost:8080/user-recipes/delete/${id}`, {
        method: 'DELETE',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ authorId: profileId })
      });
      const result = await response.json();
      if (result.success) {
        setRecipes(recipe.filter(r => (r.id) !== id));
        setShowPopup(false);
        alert('Recipe deleted!');
      } else {
        alert('Error: ' + (result.error || 'Failed to delete recipe'));
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  };


  return (
    <div className="recipes-container"> {/* Container for the list of recipes */}
        <div className = 'recipe-box addbox'
            onClick={() => openaddPopup()} // Opens the popup on click
        >
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
            {/* <p className="desc">{recipe.description}</p> */}
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
            <RecipePop recipe={activeRecipe} isMyRecipe={true} onDelete={handleDeleteRecipe} />
          </div>
        </div>
      )}
    </div>
  );
}
