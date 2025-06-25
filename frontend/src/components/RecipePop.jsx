// Importing the CSS file for styling the RecipePop component
import "./RecipePop.css";
import { localStorage } from '../utils/localStorage';

// The RecipePop component displays detailed information about a selected recipe
export default function RecipePop({ recipe, isMyRecipe, onDelete }) {
  
  const handleAddToCart = async () => {
    const ownerId = localStorage.get('id');
    const recipeId = recipe.id;
    console.log(ownerId)
    console.log(recipeId)

    if (!ownerId || !recipeId) {
      console.error('Missing ownerId or recipeId');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/foodCart/${recipeId}/${ownerId}`, {
      // const response = await fetch(`http://localhost:8080/foodCart/${recipeId}/${ownerId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      const data = await response.json();
      console.log('Added to cart:', data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="recipe-popup">
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <div className="stats">
            <p>Cuisine: {recipe.cuisine}</p>
            <span className="bar">|</span>
            <p>Dietary: {recipe.dietary}</p>
            <span className="bar">|</span>
            <p>Meal Type: {recipe.meal}</p>
        </div>
        <div className="stats">
          <p>Prep Time: {recipe.prep_time}</p>
          <span className="bar">|</span>
          <p>Cook Time: {recipe.cook_time}</p>
          <span className="bar">|</span>
          <p>Total Time: {recipe.total_time}</p>
        </div>
      </div>
      <div className="recipe-main">
        <div className="left-bar">
          <img src={recipe.image} alt={recipe.title} />
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>
                {item.qty && `${item.qty} `}
                {item.unit && `${item.unit} `}
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="right-bar">
          <h2>Directions</h2>
          <ol>
            {recipe.directions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="recipe-btn">
          <button className='add-btn' onClick={handleAddToCart}>ADD TO CART</button>

          {isMyRecipe && (
          <>
          <button className="delete-btn" onClick={() => onDelete(recipe)}>DELETE</button>
          </>
          )}
          
        </div>
    </div>
  );
}

