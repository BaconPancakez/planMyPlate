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
// export default function Postbox({ limit = null , showAddBox = true}) {
//   const [showPopup, setShowPopup] = useState(false);
//   const [activeRecipe, setActiveRecipe] = useState(null);

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
      console.log('Recipe object:', recipe);
      const title = recipe.title; // Get the recipe ID from the recipe object
      // If the recipe object does not have an id, try to get it from the getRecipeID function  
      const author = recipe.author || profileId; // Get the author ID from the recipe object or use profileId


      if (!title || !author) {
        alert('Missing title or author!');
        return;
      } 
      const response = await fetch(`http://localhost:8080/user-recipes/delete/${encodeURIComponent(title)}/${author}`, {
        method: 'DELETE',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ authorId: profileId })
      });
      const result = await response.json();
      if (result.success) {
        setRecipes(recipes.filter(r =>!(r.title === title && (r.author || profileId) === author)));
        setShowPopup(false);
        alert('Recipe deleted!');
      } else {
        alert('Error: ' + (result.error || 'Failed to delete recipe'));
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  };

  // Use limit if provided
//   const recipesToShow = limit ? data.slice(0, limit) : data;

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

      {recipes.map((recipe) => (
      {/* Recipes */}
//       {recipesToShow.map((recipe) => (
        <div
          className="recipe-box"
          key={recipe.id}
          onClick={() => openPopup(recipe)}
        >
          <img src={recipe.image} alt="Recipe" />
          <div className="recipe-details">
            <h3>{recipe.title}</h3>
            <p className="author">By {recipe.username}</p>
            {/* <p className="desc">{recipe.description}</p> */}
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
            <RecipePop recipe={activeRecipe} isMyRecipe={true} onDelete={handleDeleteRecipe} />
          </div>
        </div>
      )}
    </div>
  );
}