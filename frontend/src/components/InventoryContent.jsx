import { useState, useEffect } from "react";
import { localStorage } from '../utils/localStorage';

import InventoryDisplayBox from '../components/InventoryDisplayBox.jsx';
import InventoryAddPopup from "../components/InventoryAddPopup.jsx";

import '../pages/Inventory.css';

function InventoryContent()
{
    const [showPopup, setPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    // const profileId = localStorage.get('id'); // later change to the user token
    const profileId = localStorage.get('id'); // later change to the user token

    // Function setIngredient : 
    const [ingredients, setIngredient] = useState([])

    useEffect(() => {
    // Replace with your backend URL and port if different
    fetch(`${import.meta.env.VITE_API_LINK}/GETinventory/${profileId}`)
    // fetch(`http://localhost:8080/GETinventory/${profileId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIngredient(data.inventory);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [profileId]);

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
                                <img src="/assets/Add.png"/>
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