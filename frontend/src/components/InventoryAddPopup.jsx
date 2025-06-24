import React, { useState } from "react";

function AddIngredient({isVisible, onClose, onAdd})
{
    const [ingredientName, setIngredientName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [units, setUnits] = useState('')
    
    const submit = (e) =>{
        e.preventDefault();
        
        if (ingredientName && quantity) // not empty
        {         
            // Custom callback prop that expects DATA
            onAdd({ingredientName, quantity, units}); 

            setIngredientName('');
            setQuantity('');
            setUnits('')
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

                <div className="closeBtn">
                    <button type="button" onClick={onClose} className='icon-button default-button'>
                        <img src="../src/assets/CloseBtn.png"/> 
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