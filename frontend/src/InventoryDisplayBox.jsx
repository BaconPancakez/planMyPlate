import React from 'react';

function DisplayBox({name, quantity, onDelete})
{
    return (
        <div className='display-box'>
            <h2 className="display-box-title">{name}</h2>
            <h4 className="display-box-quantity">{quantity}</h4>
            <button onClick={onDelete}>Delete</button>
        </div>
    )
}

export default DisplayBox;