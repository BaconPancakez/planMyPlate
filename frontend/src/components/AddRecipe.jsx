import React, { useState } from 'react';
import './AddRecipe.css';

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


  return (
    <div className='recipe-popup-add'>
      
      <h1>Create New Post</h1>

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
            <select name="units" className="addMealType-input" defaultValue={"breakfast"} onChange={e => setMealType(e.target.value)}>
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
            <div className='ingredients'>
              <input
                type='text'
                className='addIngreInput'
                placeholder='Eg. 1 Cucumber'
                onKeyDown={e => {
                  if (e.key === 'Enter' && e.target.value) {
                    setIngredients([...ingredients, e.target.value]);
                    e.target.value = ''; // clear input after adding
                  }
                }}
              />
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
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
    </div>
  );
}


