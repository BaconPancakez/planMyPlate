import React, { useState } from "react";

import InventoryDisplayBox from './InventoryDisplayBox.jsx';
import InventoryAddPopup from "./InventoryAddPopup.jsx";


function InventoryContent()
{
    const [showPopup, setPopup] = useState(false);
        
    // Function setIngredient : 
    const [ingredients, setIngredient] = useState([
        {id: 1, name: "Apple", quantity: "7"},
        {id: 2, name: "Sugar", quantity: "90 grams"},
    ])

    // Deletion Logic
    const deleteDisplayBox = (id) => {
                
        setIngredient(prevItems => {
            // Update state by filtering out the item with the matching ID
            const updatedIngredients = prevItems.filter(item => item.id !== id);
            return updatedIngredients; // return other items
        })
    }

    // Adding Logic
    const AddIngredient = (newItem) => {

        setIngredient(prevItem => {
            
            // Set the ID number
            const newId = prevItem.length > 0 ? prevItem.length + 1 : 1;

            return [
                ...prevItem, // Take existing ones (prevItem)  ---> Create new arrays (below)
                // newItem.ingredientName, newItem.quantity ---> comes from onAdd({ingredientName, quantity})
                { id: newId, name: newItem.ingredientName, quantity: newItem.quantity } // Adds the new ingredient object
            ];
        });
    }

    return (
        <>
            <div>
                <h1>Ingredients in my fridge</h1>

                <div>

                    <div className="display-box container">
                        {/* create multiple instances using .map */}
                        {ingredients.map(item => (
                            <InventoryDisplayBox 
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            quantity={item.quantity}
                            onDelete={() => deleteDisplayBox(item.id)}
                            />
                        ))}
                    </div>

                    <div>
                        <button onClick={() => setPopup(true)}>+ Add</button>
                    </div>
                    
                    <div className="display-popup">
                        <InventoryAddPopup
                            isVisible={showPopup}
                            onAdd={AddIngredient}
                            onClose={() => setPopup(false)}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}

export default InventoryContent;