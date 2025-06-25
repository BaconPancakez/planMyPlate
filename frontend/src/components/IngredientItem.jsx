// components/IngredientItem.jsx
import React from 'react';
import './IngredientItem.css'; // Import the CSS file directly

const IngredientItem = ({ ingredient, servingSize }) => {
  const { name, type, image, qty, unit } = ingredient;
  const intServingSize = parseInt(servingSize) || 1;
  const parsedQty = parseFloat(qty) || 0;
  const scaledQty = parsedQty * intServingSize;

  return (
    <div className="ii-item"> {/* Use the prefixed class name */}
      {/* <img src={image} alt={name} className="ii-image" /> Use the prefixed class name */}
      <div className="ii-info"> {/* Use the prefixed class name */}
        <div className="ii-name">{name.toUpperCase()}</div> {/* Use the prefixed class name */}
      </div>
      <div className="ii-quantity"> {/* Use the prefixed class name */}
        {unit === 'count' ? `x ${scaledQty}` : `${scaledQty} ${unit}`}
      </div>
    </div>
  );
};

export default IngredientItem;