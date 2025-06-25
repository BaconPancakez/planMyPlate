// pages/FoodCart.jsx
import React, { useState, useEffect } from 'react';
import { localStorage }  from "../utils/localStorage";
import RecipeCard from '../components/RecipeCard';
import RecipePopup from '../components/RecipePopup';
import { useNavigate } from 'react-router-dom';
import './FoodCart.css';

export default function FoodCart() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get owner_id from localStorage (or set your own logic)
    const owner_id = localStorage.get('id');
    console.log('[FoodCart] owner_id from localStorage:', owner_id);
    if (!owner_id) {
      console.warn('[FoodCart] No owner_id found in localStorage. Aborting fetch.');
      return;
    }
    const url = `http://localhost:8080/api/foodcart/${owner_id}`;
    console.log('[FoodCart] Fetching:', url);
    fetch(url)
      .then((res) => {
        console.log('[FoodCart] Raw response:', res);
        if (!res.ok) {
          console.error(`[FoodCart] Fetch failed with status: ${res.status}`);
        }
        return res.text();
      })
      .then((text) => {
        console.log('[FoodCart] Raw response text:', text);
        try {
          const data = JSON.parse(text);
          console.log('[FoodCart] Parsed JSON:', data);
          setRecipes(data.recipes || []);
        } catch (err) {
          console.error('[FoodCart] Failed to parse JSON:', err);
        }
      })
      .catch((err) => console.error('[FoodCart] Network or fetch error:', err));
  }, []);

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

