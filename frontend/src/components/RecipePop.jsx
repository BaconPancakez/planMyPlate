// Importing the CSS file for styling the RecipePop component
import "./RecipePop.css";

// The RecipePop component displays detailed information about a selected recipe
export default function RecipePop({ recipe, isMyRecipe }) {
  return (
    <div className="recipe-popup">
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <div className="stats">
            <p>Cuisine: {recipe.stats.cuisine}</p>
            <span className="bar">|</span>
            <p>Dietary: {recipe.stats.dietary}</p>
            <span className="bar">|</span>
            <p>Meal: {recipe.stats.meal}</p>
        </div>
        <div className="stats">
          <p>Prep Time: {recipe.stats.prepTime}</p>
          <span className="bar">|</span>
          <p>Cook Time: {recipe.stats.cookTime}</p>
          <span className="bar">|</span>
          <p>Total Time: {recipe.stats.totalTime}</p>
        </div>
      </div>
      <div className="recipe-main">
        <div className="left-bar">
          <img src={recipe.image} alt={recipe.title} />
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
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
          <button className= "update-btn">Update</button>
          <button className="delete-btn">Delete</button>
        </>
        )}
        <button className='add-btn'>Add to Cart</button>
      </div>
    </div>
  );
}

