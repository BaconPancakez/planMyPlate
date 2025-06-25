// Importing the CSS file for styling the RecipePop component
import "./RecipePop.css";

// The RecipePop component displays detailed information about a selected recipe
export default function RecipePop({ recipe, isMyRecipe, onDelete }) {
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
          {isMyRecipe && (
          <>
          <button className= "update-btn">UPDATE</button>
          </>
          )}

          <button className='add-btn'>ADD TO CART</button>

          {isMyRecipe && (
          <>
          <button className="delete-btn" onClick={() => onDelete(recipe)}>DELETE</button>
          </>
          )}
          
        </div>
    </div>
  );
}

