// pages/FoodCart.jsx
import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipePopup from '../components/RecipePopup';
import { useNavigate } from 'react-router-dom';
import { dummyRecipes } from '../DummyData/dataAI';
// No import for FoodCart.css if it doesn't have unique styles besides 'page'

// const dummyRecipes = [
//   // ... your dummy recipes
// ];

export default function FoodCart() {
  const [recipes, setRecipes] = useState(dummyRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const navigate = useNavigate();

  const toggleCheck = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleShowIngredients = () => {
    const selected = recipes.filter((r) => checkedItems.includes(r.id));
    navigate('/ingredients', { state: { selected } });
  };

  return (
    <div className="page"> {/* This 'page' class comes from index.css (global) */}
      <h1>Food Cart</h1>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isChecked={checkedItems.includes(recipe.id)}
          onToggleCheck={() => toggleCheck(recipe.id)}
          onView={() => setSelectedRecipe(recipe)}
          onDelete={() => handleDelete(recipe.id)}
        />
      ))}

      <button onClick={handleShowIngredients} className="primary-btn" style={{ marginTop: '20px' }}>
        Show Ingredients
      </button>

      {selectedRecipe && (
        <RecipePopup
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
};

