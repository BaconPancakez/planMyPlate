import "./RecipePop.css"

export default function RecipePop({ recipe }) {
  return (
    <div className="recipe-popup">
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
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
    </div>
  );
}

