import React, { useState, useEffect } from 'react'; // Add useEffect for calculated ingredients
import { useLocation, useNavigate } from 'react-router-dom';
import IngredientGroup from '../components/IngredientGroup';

const IngredientsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedRecipes = location.state?.selected || [];

  const [servingSizes, setServingSizes] = useState(
    selectedRecipes.reduce((acc, recipe) => {
      acc[recipe.id] = 1;
      return acc;
    }, {})
  );

  // State to hold the aggregated ingredients for the shopping list
  const [aggregatedIngredients, setAggregatedIngredients] = useState([]);

  // Calculate aggregated ingredients whenever servingSizes or selectedRecipes change
  useEffect(() => {
    const aggregate = {}; // Use an object to sum quantities by ingredient name

    selectedRecipes.forEach(recipe => {
      const currentServing = servingSizes[recipe.id] || 1;
      recipe.ingredients.forEach(ingredient => {
        const key = ingredient.name.toLowerCase(); // Use lowercase name as key to avoid duplicates like "Tomato" and "tomato"

        if (aggregate[key]) {
          // If ingredient already exists, add to its quantity
          aggregate[key].quantity += ingredient.quantity * currentServing;
        } else {
          // Otherwise, add new ingredient
          aggregate[key] = {
            ...ingredient,
            quantity: ingredient.quantity * currentServing,
          };
        }
      });
    });

    // Convert the aggregated object back to an array
    setAggregatedIngredients(Object.values(aggregate));
  }, [selectedRecipes, servingSizes]); // Depend on these states

  const handleChangeServing = (id, delta) => {
    setServingSizes((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] + delta),
    }));
  };

  const handleAddIngredientsToShoppingList = () => {
    // Navigate to shopping list, passing the aggregated ingredients
    // Note: This won't persist on refresh. For persistence, use Context/backend.
    navigate('/shopping-list', { state: { ingredientsToAdd: aggregatedIngredients } });
  };

  return (
    <div className="page ingredients-list-page">
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-button">←</button>
        <h1>Ingredients List</h1>
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

      {selectedRecipes.length > 0 && ( // Only show button if there are selected recipes
        <button
          onClick={handleAddIngredientsToShoppingList}
          className="primary-btn" // Use a class for consistent button styling
          style={{ marginTop: '20px', padding: '10px 20px' }} // Add some inline style for spacing if needed
        >
          Add to Shopping List
        </button>
      )}
    </div>
  );
};

export default IngredientsList;