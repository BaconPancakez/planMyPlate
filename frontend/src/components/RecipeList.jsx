import { useState } from 'react';
import RecipePop from './RecipePop';
import "./RecipeList.css";

const recipes = [
  {
    id: 1,
    title: 'Pancakesss',
    author: 'Bacon',
    description: 'bla bla bla bla bla bla',
    image: './src/assets/pancakes.jpg',
  },
  {
    id: 2,
    title: 'Fish Burger',
    author: 'Fishie',
    description: 'bloop bloop',
    image: './src/assets/burger.png',
  },
  {
    id: 3,
    title: ' Burger',
    author: 'blabla',
    description: 'bloop bloop',
    image: './src/assets/burger.png',
  },  
  {
    id: 4,
    title: 'Just Pancakes',
    author: 'Bacon',
    description: 'bla bla bla bla bla bla',
    image: './src/assets/pancakes.jpg',
  },
  {
    id: 5,
    title: ' Burger',
    author: 'blabla',
    description: 'bloop bloop',
    image: './src/assets/burger.png',
  },  
  {
    id: 6,
    title: 'Just Pancakes',
    author: 'Bacon',
    description: 'bla bla bla bla bla bla',
    image: './src/assets/pancakes.jpg',
  },
  // Add more recipes as needed
];

export default function Recipe() {
  const [showPopup, setShowPopup] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState(null);

  const openPopup = (recipe) => {
    setActiveRecipe(recipe);
    setShowPopup(true);
  };

  return (
    <div className="recipes-container">
      {recipes.map((recipe) => (
        <div
          className="recipe-box"
          key={recipe.id}
          onClick={() => openPopup(recipe)}
        >
          <img src={recipe.image} alt="Recipe" />
          <div className="recipe-details">
            <h3>{recipe.title}</h3>
            <p className="category">By {recipe.author}</p>
            <p className="desc">{recipe.description}</p>
          </div>
        </div>
      ))}

      {showPopup && (
        <div className="popup-backdrop" onClick={() => setShowPopup(false)}>
          <div
            className="popup-container"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the modal
          >
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              &times;
            </button>
            <RecipePop recipe={activeRecipe} />
          </div>
        </div>
      )}
    </div>
  );
}