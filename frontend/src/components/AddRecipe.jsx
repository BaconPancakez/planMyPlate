import React, { useState, useRef } from 'react';
import './AddRecipe.css';
import { localStorage } from "../utils/localStorage";


export default function AddRecipe() {
  const [title, setTitle] = useState(''); // added state for title (initially empty string)
  const [cuisine, setCuisine] = useState(''); // state for cuisine
  const [dietType, setDietType] = useState(''); // state for diet type
  const [mealType, setMealType] = useState(''); // state for meal type
  const [prepTime, setPrepTime] = useState(''); // state for prep time
  const [cookTime, setCookTime] = useState(''); // state for cook time
  const [totalTime, setTotalTime] = useState(''); // state for total time
  const [imageUrl, setImageUrl] = useState(''); // state for image URL
  const [displayedImageUrl, setDisplayedImageUrl] = useState(''); // state for displayed image URL
  const [ingredients, setIngredients] = useState([]); // state for ingredients
  const [directions, setDirections] = useState(''); // state for directions

  const qtyRef = useRef(null);
  const unitRef = useRef(null);
  const nameRef = useRef(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !cuisine || !dietType || !mealType || !prepTime || !cookTime
      || !totalTime || !imageUrl || !directions || !ingredients || ingredients.length === 0) { // Added check for empty ingredients array
      alert("Please fill in all fields, including at least one ingredient.");
      return;
    }

    // Prepare directions as an array (if you want to split by newlines)
    const directionsArray = directions
      ? directions.split('\n').map(line => line.trim()).filter(Boolean)
      : [];

    const recipeData = {
      title: title,
      image: displayedImageUrl || imageUrl,
      author: localStorage.get('id'), // Assuming 'id' from localStorage is the profileId
      cuisine: cuisine,
      dietary: dietType,
      meal: mealType,
      prep_time: prepTime,
      cook_time: cookTime,
      total_time: totalTime,
      ingredients: ingredients, // ingredients array already has { qty, unit, name }
      directions: directionsArray,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/insert-Recipe`, {
      // const response = await fetch('http://localhost:8080/insert-Recipe', { // Keep for local testing if needed
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData),
      });
      const result = await response.json();
      if (result.success) {
        alert('Recipe posted!');
        // Optionally reset form or close popup here
        // Example: resetForm();
        // Example: onClose(); // If this component is used in a popup
      } else {
        alert('Error: ' + (result.error || 'Failed to post recipe'));
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  };

  // Optional: Add a function to reset the form fields
  // const resetForm = () => {
  //   setTitle('');
  //   setCuisine('');
  //   setDietType('');
  //   setMealType('');
  //   setPrepTime('');
  //   setCookTime('');
  //   setTotalTime('');
  //   setImageUrl('');
  //   setDisplayedImageUrl('');
  //   setIngredients([]);
  //   setDirections('');
  //   if (qtyRef.current) qtyRef.current.value = '';
  //   if (unitRef.current) unitRef.current.value = ' ';
  //   if (nameRef.current) nameRef.current.value = '';
  // };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const quantityString = qtyRef.current.value.trim();
      const unit = unitRef.current.value;
      const name = nameRef.current.value.trim();

      // Convert quantity to integer and validate
      const quantityInt = parseInt(quantityString, 10); // Use a different variable name for the integer value

      // Check if quantityString is not empty and quantityInt is a valid number
      if (quantityString && !isNaN(quantityInt) && unit && name) {
        // Use 'qty' as the key for the quantity
        const newIngredient = { qty: quantityInt, unit, name };
        setIngredients([...ingredients, newIngredient]);

        // Clear inputs
        qtyRef.current.value = '';
        unitRef.current.value = ' '; // Reset select to default empty value
        nameRef.current.value = '';
      } else {
        alert('Please fill in all ingredient fields (quantity, unit, name) with valid values before adding.');
      }
    }
  };


  return (
    <div className='recipe-popup-add'>

      <h1>Create New Post</h1>

      <form onSubmit ={handleSubmit}>

        <div className="recipe-header">

          <div className='recipe-title'>
            Enter Recipe Name
            <input
              className='addTitle-input'
              type='text'
              placeholder='Eg. Greek Salad'
              value={title}
              onChange={e => setTitle(e.target.value)} // update title state on change
            />
          </div>

          <div className='add-image-parent'>
            Enter Image URL
            <div className='imageBox'>

              <input
                  type='text'
                  className='addImageUrl-input'
                  placeholder='Eg. https://cdn.loveandlemons.com/wp-content/uploads/2024/07/avocado-salad.jpg'
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                />

              <button
                className='add-image-button'
                type='button'
                onClick={() => setDisplayedImageUrl(imageUrl)}
                >
                ADD
              </button>

            </div>
            {displayedImageUrl && <img src={displayedImageUrl} alt='Recipe' className='recipe-image' />}
          </div>

          <div className='top-half'>
            <div className='addInputs'>
              Enter Cuisine Type
              <input
                className='addCuisine-input'
                type='text'
                placeholder='Eg. Mediterranean Cuisine'
                value={cuisine}
                onChange={e => setCuisine(e.target.value)} // update cuisine state on change
                />
            </div>

            <div className='addInputs'>
              Enter Diet Type
              <input
                className='addDietType-input'
                type='text'
                placeholder='Eg. Vegetarian, Halal'
                value={dietType}
                onChange={e => setDietType(e.target.value)} // update diet type state on change
              />
            </div>

            <div className='addInputs'>
              Select Meal Type
              <select name="units" className="addMealType-input" value={mealType} onChange={e => setMealType(e.target.value)}>
                <option value="">-- Select --</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>

          </div>

          <div className='low-half'>

            <div className='addInputs'>
              Enter Prep Time
              <input
                className='addPrepTime-input'
                type='text'
                placeholder='Eg. 2 minutes'
                value={prepTime}
                onChange={e => setPrepTime(e.target.value)} // update prep time state on change
              />
            </div>

            <div className='addInputs'>
              Enter Cook Time
              <input
                className='addCookTime-input'
                type='text'
                placeholder='Eg. 3 minutes'
                value={cookTime}
                onChange={e => setCookTime(e.target.value)} // update cook time state on change
              />
            </div>

            <div className='addInputs'>
              Enter Total Time
              <input
                className='addTotalTime-input'
                type='text'
                placeholder='Eg. 5 minutes'
                value={totalTime}
                onChange={e => setTotalTime(e.target.value)} // update total time state on change
              />
            </div>

          </div>

        </div>

        <div className="popup-container-add">
          <div className="addrecipe-main">

            <div className='left-bar'>

              <h2>Ingredients</h2>

              <div className='ingredients' onKeyDown={handleKeyDown}>
                <input
                  type='number'
                  ref={qtyRef}
                  className='addIngreInput'
                  placeholder='Eg. 3'
                />

                <select name="units" ref={unitRef} defaultValue={" "} className='addIngreInput'>
                  <option value=" ">Number</option>
                  <option value="g">Grams / g</option>
                  <option value="ml">Milliliter / ml</option>
                </select>

                <input
                  type='text'
                  ref={nameRef}
                  className='addIngreInput'
                  placeholder='Eg. Eggs'
                />
              </div>

              <div className='ingredientList'>
                 <ul>
                    {ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.qty} {ingredient.unit} {ingredient.name} {/* Corrected to use ingredient.qty */}
                      </li>
                    ))}
                  </ul>
              </div>

            </div>

            <div className='directions right-bar'>
              <h2>Directions</h2>
              <textarea
                placeholder='1. Make the dressing: In a small bowl, whisk together the olive oil, vinegar, garlic, oregano, mustard, salt, and several grinds of pepper.'
                value={directions}
                onChange={e => setDirections(e.target.value)} // update directions state on change
                rows='10'
                className='directions-textarea'
              ></textarea>
            </div>
          </div>

          <div className='post-button'>

            <button type='submit'>POST</button>

          </div>
        </div>
      </form>
    </div>
  );
}


