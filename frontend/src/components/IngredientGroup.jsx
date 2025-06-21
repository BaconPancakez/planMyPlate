// // components/IngredientGroup.jsx
// import React from 'react';
// import IngredientItem from './IngredientItem';

// const IngredientGroup = ({ recipe, servingSize, onChangeServing, index }) => {
//   return (
//     <div className="ingredient-group">
//       <div className="group-header">
//         <h2>Recipe {index}: {recipe.name}</h2>
//         <div className="serving-control">
//           <span>Serving Size:</span>
//           <button onClick={() => onChangeServing(-1)}>-</button>
//           <span className="serving-count">{servingSize}</span>
//           <button onClick={() => onChangeServing(1)}>+</button>
//         </div>
//       </div>
//       <div className="ingredient-list">
//         {recipe.ingredients.map((ingredient, i) => (
//           <IngredientItem
//             key={i}
//             ingredient={ingredient}
//             servingSize={servingSize}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default IngredientGroup;


// components/IngredientGroup.jsx
import React from 'react';
import IngredientItem from './IngredientItem';
import './IngredientGroup.css'; // Import the CSS file directly

const IngredientGroup = ({ recipe, servingSize, onChangeServing, index }) => {
  return (
    <div className="ig-group"> {/* Use the prefixed class name */}
      <div className="ig-group-header"> {/* Use the prefixed class name */}
        <h2>Recipe {index}: {recipe.name}</h2>
        <div className="ig-serving-control"> {/* Use the prefixed class name */}
          <span>Serving Size:</span>
          <button onClick={() => onChangeServing(-1)}>-</button>
          <span className="ig-serving-count">{servingSize}</span>
          <button onClick={() => onChangeServing(1)}>+</button>
        </div>
      </div>
      <div className="ig-ingredient-list"> {/* Use the prefixed class name */}
        {recipe.ingredients.map((ingredient, i) => (
          <IngredientItem
            key={i}
            ingredient={ingredient}
            servingSize={servingSize}
          />
        ))}
      </div>
    </div>
  );
};

export default IngredientGroup;