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
  // const [id, setId] = useState(); // state for recipe ID


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare directions as an array (if you want to split by newlines)
    const directionsArray = directions
      ? directions.split('\n').map(line => line.trim()).filter(Boolean)
      : [];

    const recipeData = {
      // id: id, // Assuming you have a way to generate or get the recipe ID
      title: title,
      image: displayedImageUrl || imageUrl,
      author: '1', // Assuming '1' is the profileId of the user posting the recipe
      cuisine: cuisine,
      dietary: dietType,
      meal: mealType,
      prep_time: prepTime,
      cook_time: cookTime,
      total_time: totalTime,
      ingredients: ingredients,
      directions: directionsArray,
    };

    try {
      const response = await fetch('http://localhost:8080/insert-Recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData),
      });
      const result = await response.json();
      if (result.success) {
        alert('Recipe posted!');
        // Optionally reset form or close popup here
      } else {
        alert('Error: ' + (result.error || 'Failed to post recipe'));
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  };




  return (
    <div className='recipe-popup'>
      <p className='createnewpost'>Create New Post</p>
      <form onSubmit ={handleSubmit}>

      <div className="recipe-header">
        <input
          className='addTitle-input'
          type='text'
          placeholder='Enter recipe title'
          value={title}
          onChange={e => setTitle(e.target.value)} // update title state on change
        />
        <div>
        <input
          className='addCuisine-input'
          type='text'
          placeholder='Enter cuisine type'
          value={cuisine}
          onChange={e => setCuisine(e.target.value)} // update cuisine state on change
          /> | 

          <input
            className='addDietType-input'
            type='text'
            placeholder='Enter diet type'
            value={dietType}
            onChange={e => setDietType(e.target.value)} // update diet type state on change
          /> | 

          <input
            className='addMealType-input'
            type='text'
            placeholder='Enter meal type'
            value={mealType}
            onChange={e => setMealType(e.target.value)} // update meal type state on change
          /> 
          </div>
          <div>
            
          <input
            className='addPrepTime-input'
            type='text'
            placeholder='Enter prep time'
            value={prepTime}
            onChange={e => setPrepTime(e.target.value)} // update prep time state on change
          /> |

          <input
            className='addCookTime-input'
            type='text'
            placeholder='Enter cook time'
            value={cookTime}
            onChange={e => setCookTime(e.target.value)} // update cook time state on change
          /> |

          <input
            className='addTotalTime-input'
            type='text'
            placeholder='Enter total time'
            value={totalTime}
            onChange={e => setTotalTime(e.target.value)} // update total time state on change
          />
          </div>
      </div>

      <div className="popup-container">
        <div className="addrecipe-main">
          
          <div className='left-bar'>
            <div className='add-image'>
              <input
                type='text'
                className='addImageUrl-input'
                placeholder='Enter image URL'
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
              />
              <button
                className='add-image-button'
                type='button'
                style={{ width: '100px', height: '25px', fontSize: '14px', padding: '4px 10px' }}
                onClick={() => setDisplayedImageUrl(imageUrl)}
              >
                Add Image
              </button>
              {displayedImageUrl && <img src={displayedImageUrl} alt='Recipe' className='recipe-image' />}
            </div>

            <div className='ingredients'>
              <h2>Ingredients</h2>
              <input
                type='text'
                placeholder='Add ingredient'
                onKeyDown={e => {
                  if (e.key === 'Enter' && e.target.value) {
                    e.preventDefault(); // prevent form submission
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
              placeholder='Enter detailed cooking instructions'
              value={directions}
              onChange={e => setDirections(e.target.value)} // update directions state on change
              rows='10'
              className='directions-textarea'
            ></textarea>
          </div>
        </div>

        <div className='post-button'>
          <button className='post-button-style' type = 'submit'>Post</button>
        </div>
      </div>
      </form>
    </div>
  );
}


