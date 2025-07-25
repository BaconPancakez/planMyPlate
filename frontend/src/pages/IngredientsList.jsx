// import React, { useState, useEffect, useMemo } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import IngredientGroup from '../components/IngredientGroup';
// import './IngredientsList.css';

// const IngredientsList = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const selectedRecipes = useMemo(() => location.state?.selected || [], [location.state]);

//   // Initialize servingSizes directly from selectedRecipes
//   const [servingSizes, setServingSizes] = useState(()
//     selectedRecipes.reduce((acc, recipe) => {
//       acc[recipe.id] = 1;
//       return acc;
//     }, {})
//   );

//   const aggregatedIngredients = useMemo(() => {
//     const aggregate = {};

//     selectedRecipes.forEach(recipe => {
//       const currentServing = servingSizes[recipe.id] || 1;
//       recipe.ingredients.forEach(ingredient => {
//         // Ensure quantity is parsed to a number before calculation
//         const ingredientQuantity = parseFloat(ingredient.qty);
//         if (isNaN(ingredientQuantity)) {
//             console.warn(`[IngredientsList] Invalid quantity for ingredient: ${ingredient.name}. Quantity: ${ingredient.qty}`);
//             return; // Skip this ingredient if quantity is invalid
//         }

//         const key = ingredient.name.toLowerCase();

//         if (aggregate[key]) {
//           aggregate[key].quantity += ingredientQuantity * currentServing;
//         } else {
//           aggregate[key] = {
//             // Spread existing ingredient properties (name, unit, etc.)
//             ...ingredient,
//             // Override 'qty' with a new 'quantity' property (as a number)
//             quantity: ingredientQuantity * currentServing,
//             // Add a default image if ingredient.image is not provided in your database
//             image: ingredient.image || 'https://placehold.co/50x50/cccccc/ffffff?text=No+Img', // Placeholder image
//             // Add a default type if ingredient.type is not provided
//             type: ingredient.type || 'General',
//           };
//         }
//       });
//     });

//     return Object.values(aggregate);
//   }, [selectedRecipes, servingSizes]); // Dependencies ensure re-calculation on change

//   const handleChangeServing = (id, delta) => {
//     setServingSizes((prev) => ({
//       ...prev,
//       [id]: Math.max(1, prev[id] + delta),
//     }));
//   };

//   const handleAddIngredientsToShoppingList = () => {
//     // Ensure all aggregated ingredients have a numeric quantity before passing
//     const ingredientsToAdd = aggregatedIngredients.map(ing => ({
//       ...ing,
//       quantity: parseFloat(ing.quantity) || 0 // Re-parse or ensure it's a number
//     }));
//     navigate('/shopping-list', { state: { ingredientsToAdd: ingredientsToAdd } });
//   };

//   return (
//     <div className="page ingredients-list-page">
//       <div className="header">
//         <h1>INGREDIENTS LIST</h1>
//       </div>

//       {selectedRecipes.length === 0 && (
//         <p>No recipes selected. Please go back to Food Cart to select recipes.</p>
//       )}

//       {selectedRecipes.map((recipe, index) => (
//         <IngredientGroup
//           key={recipe.id}
//           recipe={recipe}
//           servingSize={servingSizes[recipe.id]}
//           onChangeServing={(delta) => handleChangeServing(recipe.id, delta)}
//           index={index + 1}
//         />
//       ))}

//       <div className='bottomButtons'>
//         <button onClick={() => navigate(-1)} className="back-button">← BACK</button>

//         {selectedRecipes.length > 0 && (
//           <button
//             onClick={handleAddIngredientsToShoppingList}
//             className="primary-btn"
//           >
//             ADD TO SHOPPING LIST
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default IngredientsList;

// pages/IngredientsList.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IngredientGroup from '../components/IngredientGroup';
import './IngredientsList.css';

const IngredientsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Try to get selected recipes from location.state, else from localStorage
  const [selectedRecipes, setSelectedRecipes] = useState(() => {
    if (location.state?.selected && location.state.selected.length > 0) {
      return location.state.selected;
    }
    // Try to recover from localStorage
    const ids = JSON.parse(window.localStorage.getItem('selectedRecipeIds') || '[]');
    if (ids.length === 0) return [];
    // Try to get all food cart recipes from localStorage (if available)
    const foodCartRaw = window.localStorage.getItem('foodCartRecipes');
    if (foodCartRaw) {
      const foodCart = JSON.parse(foodCartRaw);
      return foodCart.filter(r => ids.includes(r.id));
    }
    // Otherwise, fallback to empty (could fetch from backend here if needed)
    return [];
  });

  // If selectedRecipes is empty, try to fetch from backend (optional, not implemented here)

  // Initialize servingSizes directly from selectedRecipes
  const [servingSizes, setServingSizes] = useState(() =>
    selectedRecipes.reduce((acc, recipe) => {
      acc[recipe.id] = 1;
      return acc;
    }, {})
  );

  const aggregatedIngredients = useMemo(() => {
    const aggregate = {};

    selectedRecipes.forEach(recipe => {
      const currentServing = servingSizes[recipe.id] || 1;
      recipe.ingredients.forEach(ingredient => {
        // Ensure quantity is parsed to a number before calculation
        const ingredientQuantity = parseFloat(ingredient.qty);
        if (isNaN(ingredientQuantity)) {
            console.warn(`[IngredientsList] Invalid quantity for ingredient: ${ingredient.name}. Quantity: ${ingredient.qty}`);
            return; // Skip this ingredient if quantity is invalid
        }

        const key = ingredient.name.toLowerCase();

        if (aggregate[key]) {
          aggregate[key].quantity += ingredientQuantity * currentServing;
        } else {
          aggregate[key] = {
            // Spread existing ingredient properties (name, unit, etc.)
            ...ingredient,
            // Override 'qty' with a new 'quantity' property (as a number)
            quantity: ingredientQuantity * currentServing,
            // Add a default image if ingredient.image is not provided in your database
            image: ingredient.image || 'https://placehold.co/50x50/cccccc/ffffff?text=No+Img', // Placeholder image
            // Add a default type if ingredient.type is not provided
            type: ingredient.type || 'General',
          };
        }
      });
    });

    return Object.values(aggregate);
  }, [selectedRecipes, servingSizes]); // Dependencies ensure re-calculation on change

  const handleChangeServing = (id, delta) => {
    setServingSizes((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] + delta),
    }));
  };

  const handleAddIngredientsToShoppingList = () => {
    // Ensure all aggregated ingredients have a numeric quantity before passing
    const ingredientsToAdd = aggregatedIngredients.map(ing => ({
      ...ing,
      quantity: parseFloat(ing.quantity) || 0 // Re-parse or ensure it's a number
    }));

    // Save the aggregated list to localStorage
    localStorage.setItem('shoppingList', JSON.stringify(ingredientsToAdd));

    navigate('/shopping-list', { state: { ingredientsToAdd: ingredientsToAdd } });
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
