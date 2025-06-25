// pages/ShoppingList.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ShoppingItem from '../components/ShoppingItem';
import './ShoppingList.css'; // Import the CSS file directly
import { FaSearch } from "react-icons/fa";
import { GiSaveArrow } from "react-icons/gi";
import { MdClear } from "react-icons/md";

const ShoppingList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ingredientsToAdd, setIngredientsToAdd] = useState(() => {
    try {
      const savedList = localStorage.getItem('shoppingList');
      return savedList ? JSON.parse(savedList) : location.state?.ingredientsToAdd || [];
    } catch (error) {
      console.error('Error parsing shopping list from localStorage:', error);
      return location.state?.ingredientsToAdd || [];
    }
  });

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(ingredientsToAdd));
  }, [ingredientsToAdd]);

  const handleSave = () => {
    localStorage.setItem('shoppingList', JSON.stringify(ingredientsToAdd));
    alert('Shopping list saved!');
  };

  const handleClear = () => {
    localStorage.removeItem('shoppingList');
    alert('Shopping list clear!');
    setIngredientsToAdd([]);
  };

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

      <div className='shopping-btns'>
        <button onClick={() => navigate('/home')} className="secondary-btn"> {/* Uses global class */}
          <FaSearch /> BACK TO EXPLORE
        </button>

        <button onClick={handleSave}><GiSaveArrow /> SAVE</button>

        <button onClick={handleClear}><MdClear /> CLEAR</button>
      </div>
    </div>
  );
};

export default ShoppingList;