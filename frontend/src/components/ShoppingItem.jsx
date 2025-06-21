// components/ShoppingItem.jsx
import React from 'react';
import './ShoppingItem.css'; // Import the CSS file directly

const ShoppingItem = ({ ingredient }) => {
  const { name, type, image, quantity, unit } = ingredient;

  return (
    <div className="si-item"> {/* Use the prefixed class name */}
      {/* <img src={image} alt={name} className="si-image" /> */}
      <div className="si-info"> {/* Use the prefixed class name */}
        <div className="si-name">{name.toUpperCase()}</div> {/* Use the prefixed class name */}
        <div className="si-details"> {/* Use the prefixed class name */}
          {quantity} {unit === 'count' ? '' : unit} {unit === 'count' ? 'x' : ''}
          {/* <span className="si-type">({type})</span> */}
        </div>
      </div>
      {/* <input type="checkbox" /> */}
    </div>
  );
};

export default ShoppingItem;