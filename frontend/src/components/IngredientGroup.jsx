import React from 'react';
import IngredientItem from './IngredientItem';
import './IngredientGroup.css'; // Import the CSS file directly

const IngredientGroup = ({ recipe, servingSize, onChangeServing, index }) => {
  return (
    <div className="ig-group"> {/* Use the prefixed class name */}
      <div className="ig-group-header"> {/* Use the prefixed class name */}
        <h2>Recipe {index}: {recipe.name}</h2>
        <div className="ig-serving-control"> {/* Use the prefixed class name */}
          <p>SERVING SIZE</p>
          <button onClick={() => onChangeServing(-1)}>-</button>
          <p className="ig-serving-count">{servingSize}</p>
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