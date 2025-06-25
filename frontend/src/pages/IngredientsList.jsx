import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IngredientGroup from '../components/IngredientGroup';
import './IngredientsList.css';

const IngredientsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedRecipes = useMemo(() => location.state?.selected || [], [location.state]);

  const [servingSizes, setServingSizes] = useState(
    selectedRecipes.reduce((acc, recipe) => {
      acc[recipe.id] = 1;
      return acc;
    }, {})
  );

  const [aggregatedIngredients, setAggregatedIngredients] = useState([]);

  useEffect(() => {
    const aggregate = {};

    selectedRecipes.forEach(recipe => {
      const currentServing = servingSizes[recipe.id] || 1;
      recipe.ingredients.forEach(ingredient => {
        const key = ingredient.name.toLowerCase();

        if (aggregate[key]) {
          aggregate[key].quantity += ingredient.quantity * currentServing;
        } else {
          aggregate[key] = {
            ...ingredient,
            quantity: ingredient.quantity * currentServing,
          };
        }
      });
    });

    setAggregatedIngredients(Object.values(aggregate));
  }, [selectedRecipes, servingSizes]);

  const handleChangeServing = (id, delta) => {
    setServingSizes((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] + delta),
    }));
  };

  const handleAddIngredientsToShoppingList = () => {
    navigate('/shopping-list', { state: { ingredientsToAdd: aggregatedIngredients } });
  };

  return (
    <div className="page ingredients-list-page">
      <div className="header">        
        <h1>INGREDIENTS LIST</h1>
      </div>

      {selectedRecipes.length === 0 && (
        <p>No recipes selected. Please go back to Food Cart to select recipes.</p>
      )}

      {selectedRecipes.map((recipe, index) => (
        <IngredientGroup
          key={recipe.id}
          recipe={recipe}
          servingSize={servingSizes[recipe.id]}
          onChangeServing={(delta) => handleChangeServing(recipe.id, delta)}
          index={index + 1}
        />
      ))}

      <div className='bottomButtons'>
        <button onClick={() => navigate(-1)} className="back-button">← BACK</button>

        {selectedRecipes.length > 0 && (
          <button
            onClick={handleAddIngredientsToShoppingList}
            className="primary-btn"
          >
            ADD TO SHOPPING LIST
          </button>
        )}


      </div>
    </div>
  );
};

export default IngredientsList;