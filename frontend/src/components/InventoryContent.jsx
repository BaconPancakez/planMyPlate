import React, { useState } from "react";

import InventoryDisplayBox from '../components/InventoryDisplayBox.jsx';
import InventoryAddPopup from "../components/InventoryAddPopup.jsx";

import '../pages/Inventory.css';

function InventoryContent()
{
    const [showPopup, setPopup] = useState(false);
        
    // Function setIngredient : 
    const [ingredients, setIngredient] = useState([
        {id: 1, name: "Apple", quantity: "7", units: " "},
        {id: 2, name: "Sugar", quantity: "90", units: "grams"},
        {id: 3, name: "Honey", quantity: "120", units: "ml"},
        {id: 4, name: "Pineapple", quantity: "1",  units: " "},
        {id: 5, name: "Eggs", quantity: "3",  units: " "},
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
                { id: newId, name: newItem.ingredientName, quantity: newItem.quantity, units: newItem.units} // Adds the new ingredient object
            ];
        });
    }

    return (
        <>
            <div className="parent-mainBox">
                <div className="header">
                    <h1>INGREDIENTS IN MY FRIDGE</h1>
                </div>

                <div className="mainBox">

                    <div className="wholeContainer">                        

                        {/* Add button */}
                        <div className="parent-box">
                            <button onClick={() => setPopup(true)} className="AddBtn default-button">
                                <img src="../src/assets/Add.png"/>
                            </button>                                
                        </div>

                        {/* create multiple instances using .map */}
                        {ingredients.map(item => (
                            <InventoryDisplayBox 
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            quantity={item.quantity}
                            units={item.units}
                            onDelete={() => deleteDisplayBox(item.id)}
                            />
                        ))}
                    </div>
                    
                    <InventoryAddPopup
                        isVisible={showPopup}
                        onAdd={AddIngredient}
                        onClose={() => setPopup(false)}
                    />                        

                </div>
            </div>
        </>
    )
}

export default InventoryContent;