import React, { useState } from "react";

function AddIngredient({isVisible, onClose, onAdd})
{
    const [ingredientName, setIngredientName] = useState('');
    const [quantity, setQuantity] = useState('');
    
    const submit = (e) =>{
        e.preventDefault();
        
        if (ingredientName && quantity) // not empty
        {         
            // Custom callback prop that expects DATA
            onAdd({ingredientName, quantity}); 

            setIngredientName('');
            setQuantity('');
            onClose();

        } else
        {
            alert("Please fill up all input fields.")
        }
    }
    
    if (!isVisible) return null;
    
    return(
        <div className="popupOverlay">

            <div className="popupContent">
                <h2>Add Ingredients</h2>
                <form id="addInventory"  onSubmit={submit}>
                    <label>Enter Name:
                        <input type="text" onChange={(a) => setIngredientName(a.target.value)}></input>
                    </label>

                    <label>Quantity:
                        <input type="number" onChange={(e) => setQuantity(e.target.value)}></input>
                    </label>

                    <div>
                        <button type="submit">Confirm</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddIngredient;