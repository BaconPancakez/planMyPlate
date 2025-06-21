// pages/FoodCart.jsx
import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipePopup from '../components/RecipePopup';
import { useNavigate } from 'react-router-dom';
import { dummyRecipes } from '../DummyData/dataAI';
import './FoodCart.css';

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
    <div className="page">
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

      <button onClick={handleShowIngredients} className="primary-btn">
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
}

