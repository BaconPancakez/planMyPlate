import React, { useState } from "react";
import { localStorage } from '../utils/localStorage'; // Import localStorage utility

function AddIngredient({isVisible, onClose, onAdd})
{
    const [ingredientName, setIngredientName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [units, setUnits] = useState('')
    
    const handleAdd = async (ingredientData) => {
        const owner_id = localStorage.get('id'); // Get owner_id from localStorage
        if (!owner_id) {
            alert('User not logged in. Cannot add ingredient.');
            return;
        }

        const ingredientToSend = {
            name: ingredientData.ingredientName,
            quantity: ingredientData.quantity,
            units: ingredientData.units,
            owner_id: parseInt(owner_id, 10), // Ensure owner_id is a number
            category: null // Assuming category is optional or null for now
        };

        try {
            // Update the fetch URL to point to the backend server (port 8080)
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/insert-ingredient`, {
            //const response = await fetch('http://localhost:8080/insert-ingredient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ingredientToSend),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Ingredient added successfully:', data.newIngredient);
                onAdd(data.newIngredient); // Call onAdd with the newly added ingredient data
                onClose();
            } else {
                console.error('Failed to add ingredient:', data.error);
                alert(`Failed to add ingredient: ${data.error}`);
            }
        } catch (error) {
            console.error('Error adding ingredient:', error);
            alert('An error occurred while adding the ingredient.');
        }
    };

    const submit = (e) =>{
        e.preventDefault();
        
        if (ingredientName && quantity) // not empty
        {         
            // Call handleAdd instead of onAdd directly
            handleAdd({ingredientName, quantity, units}); 

            setIngredientName('');
            setQuantity('');
            setUnits('')
            // onClose is now called inside handleAdd on success

        } else
        {
            alert("Please fill up all input fields.")
        }
    }
    
    if (!isVisible) return null;
    
    return(
        <div className="popupOverlay">


            <div className="popupContent">

                <div className="closeBtn">
                    <button type="button" onClick={onClose} className='icon-button default-button'>
                        <img src="/assets/CloseBtn.png"/> 
                    </button>
                </div>

                <h2>ADD INGREDIENTS</h2>
                    
                <form className="info"  onSubmit={submit}>
                    <div id="addInventory">
                        <label className="input">
                            Enter Name:
                            <input type="text" onChange={(a) => setIngredientName(a.target.value)}></input>
                        </label>

                        <label className="input">
                            Quantity:
                            <input type="number" onChange={(e) => setQuantity(e.target.value)}></input>
                        </label>

                        <label className="input">
                            Select Measurement Units:
                            <select name="units" defaultValue={"num"} onChange={(e) => setUnits(e.target.value)}>
                                <option value=" ">Number</option>
                                <option value="grams">Grams / g</option>
                                <option value="ml">Milliliter / ml</option>
                            </select>
                        </label>
                    </div>

                    <div className="submitButtons">
                        <button type="submit" className="default-button">CONFIRM</button>                        
                    </div>
                </form>

            </div>

        </div>
    )
}

export default AddIngredient;