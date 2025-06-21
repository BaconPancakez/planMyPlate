// pages/ShoppingList.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ShoppingItem from '../components/ShoppingItem';
import './ShoppingList.css'; // Import the CSS file directly

const ShoppingList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ingredientsToAdd = location.state?.ingredientsToAdd || [];

  return (
    <div className="page"> {/* Uses global 'page' class */}
      <h1>Shopping List</h1>

      {ingredientsToAdd.length === 0 ? (
        <p>No ingredients added yet. Go to "Meal Plan" to select recipes and add ingredients.</p>
      ) : (
        <div className="sl-items-container"> {/* Use the prefixed class name */}
          {ingredientsToAdd.map((ingredient, idx) => (
            <ShoppingItem
              key={ingredient.name + idx}
              ingredient={ingredient}
            />
          ))}
        </div>
      )}

      <button onClick={() => navigate(-1)} className="secondary-btn"> {/* Uses global class */}
        ⬅️ Back to ingredients
      </button>
    </div>
  );
};

export default ShoppingList;