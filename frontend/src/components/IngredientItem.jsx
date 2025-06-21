// // // components/IngredientItem.jsx
// // import React from 'react';

// // const IngredientItem = ({ ingredient, servingSize }) => {
// //   const { name, type, image, quantity, unit } = ingredient;
// //   const scaledQuantity = quantity * servingSize;

// //   return (
// //     <div className="ingredient-item">
// //       <img src={image} alt={name} className="ingredient-image" />
// //       <div className="ingredient-info">
// //         <div className="ingredient-name">{name.toUpperCase()}</div>
// //         <div className="ingredient-type">Type: {type}</div>
// //       </div>
// //       <div className="ingredient-quantity">
// //         {unit === 'count' ? `x ${scaledQuantity}` : `${scaledQuantity} ${unit}`}
// //       </div>
// //     </div>
// //   );
// // };

// // export default IngredientItem;


// // pages/IngredientsList.jsx
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import IngredientGroup from '../components/IngredientGroup';
// import './IngredientsList.css'; // Import the CSS file directly

// const IngredientsList = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const selectedRecipes = location.state?.selected || [];

//   const [servingSizes, setServingSizes] = useState(
//     selectedRecipes.reduce((acc, recipe) => {
//       acc[recipe.id] = 1;
//       return acc;
//     }, {})
//   );

//   const [aggregatedIngredients, setAggregatedIngredients] = useState([]);

//   useEffect(() => {
//     const aggregate = {};

//     selectedRecipes.forEach(recipe => {
//       const currentServing = servingSizes[recipe.id] || 1;
//       recipe.ingredients.forEach(ingredient => {
//         const key = ingredient.name.toLowerCase();

//         if (aggregate[key]) {
//           aggregate[key].quantity += ingredient.quantity * currentServing;
//         } else {
//           aggregate[key] = {
//             ...ingredient,
//             quantity: ingredient.quantity * currentServing,
//           };
//         }
//       });
//     });
//     setAggregatedIngredients(Object.values(aggregate));
//   }, [selectedRecipes, servingSizes]);

//   const handleChangeServing = (id, delta) => {
//     setServingSizes((prev) => ({
//       ...prev,
//       [id]: Math.max(1, prev[id] + delta),
//     }));
//   };

//   const handleAddIngredientsToShoppingList = () => {
//     navigate('/shopping-list', { state: { ingredientsToAdd: aggregatedIngredients } });
//   };

//   return (
//     <div className={`page il-page`}> {/* Use global 'page' and page-specific class */}
//       <div className="il-header"> {/* Use the prefixed class name */}
//         <button onClick={() => navigate(-1)} className="il-back-button">←</button> {/* Use the prefixed class name */}
//         <h1>Ingredients List</h1>
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

//       {selectedRecipes.length > 0 && (
//         <button
//           onClick={handleAddIngredientsToShoppingList}
//           className="primary-btn" // This uses a global class from index.css
//           style={{ marginTop: '20px', padding: '10px 20px' }}
//         >
//           Add to Shopping List
//         </button>
//       )}
//     </div>
//   );
// };

// export default IngredientsList;

// components/IngredientItem.jsx
import React from 'react';
import './IngredientItem.css'; // Import the CSS file directly

const IngredientItem = ({ ingredient, servingSize }) => {
  const { name, type, image, quantity, unit } = ingredient;
  const scaledQuantity = quantity * servingSize;

  return (
    <div className="ii-item"> {/* Use the prefixed class name */}
      <img src={image} alt={name} className="ii-image" /> {/* Use the prefixed class name */}
      <div className="ii-info"> {/* Use the prefixed class name */}
        <div className="ii-name">{name.toUpperCase()}</div> {/* Use the prefixed class name */}
        <div className="ii-type">Type: {type}</div> {/* Use the prefixed class name */}
      </div>
      <div className="ii-quantity"> {/* Use the prefixed class name */}
        {unit === 'count' ? `x ${scaledQuantity}` : `${scaledQuantity} ${unit}`}
      </div>
    </div>
  );
};

export default IngredientItem;