import { useState } from 'react';
import RecipePop from './RecipePop.jsx';
import AddRecipe from './AddRecipe.jsx';
import './RecipeList.css';

export default function Postbox({ recipes = [] }) {
  const [showPopup, setShowPopup] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState(null);

  const openPopup = (recipe) => {
    setActiveRecipe(recipe);
    setShowPopup(true);
  };

  const openAddPopup = () => {
    setActiveRecipe(null);
    setShowPopup(true);
  };

  const handleDeleteRecipe = async (recipe) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    
    try {
       const response = await fetch(`${import.meta.env.VITE_API_LINK}/delete/${recipe.title}`, {
      //const response = await fetch(`http://localhost:8080/user-recipes/delete/${recipe.title}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        // Optionally, you can trigger a refresh in the parent component
        setShowPopup(false);
        alert('Recipe deleted!');
      } else {
        alert(`Error: ${result.error || 'Failed to delete recipe'}`);
      }
    } catch (error) {
      alert(`Network error: ${error.message}`);
    }
  };

  return (
    <div className="recipes-container">
      <div className="recipe-box addbox" onClick={openAddPopup}></div>
      {recipes.map((recipe) => (
        <div
          className="recipe-box"
          key={recipe.title}
          onClick={() => openPopup(recipe)}
        >
          <img src={recipe.image} alt="Recipe" />
          <div className="recipe-details">
            <h3>{recipe.title}</h3>
            <p className="author">By {recipe.username}</p>
          </div>
        </div>
      ))}
      {showPopup && (
        <div className="popup-backdrop" onClick={() => setShowPopup(false)}>
          <div className="popup-container" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              <img src="../src/assets/CloseBtn.png"/>
            </button>
            {activeRecipe ? (
              <RecipePop recipe={activeRecipe} isMyRecipe={true} onDelete={handleDeleteRecipe} />
            ) : (
              <AddRecipe />
            )}
          </div>
        </div>
      )}
    </div>
  );
}