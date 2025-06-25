import React from 'react';

function DisplayBox({name, quantity, units, onDelete})
{
    return (
        <div className='parent-box'>
            <div className='display-box'>
                <div className='info'>
                    <h2 className="display-box-title">{name}</h2>
                    <p className="display-box-quantity">Quantity: <strong>{quantity} {units}</strong></p>
                </div>

                <div className='deleteBtn'>
                    {/*<button onClick={onDelete}>Delete</button>*/}
                    <button onClick={onDelete} className='icon-button default-button'>
                        <img src="/assets/bin.png"/>                 
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DisplayBox;