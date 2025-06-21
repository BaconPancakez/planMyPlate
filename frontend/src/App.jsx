// Importing necessary components and styles
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Explore from './pages/Explore';
import Home from './pages/Home';
import MyRecipe from './pages/MyRecipe.jsx'
import NavBar from './components/NavBar';
import FoodCart from './pages/FoodCart.jsx';
import IngredientsList from './pages/IngredientsList';
import ShoppingList from './pages/ShoppingList';

// The App component serves as the root component of the application
function App() {
  return (
    <div className="layout"> {/* Layout container for the app */}
      <NavBar /> {/* Navigation bar displayed globally */}
      <main className="main-content"> {/* Main content area */}
        <header className="main-header"> {/* Header section */}
        </header>
        <Routes> {/* Defines the routes for the application */}
          <Route path="/" element={<Home />} /> {/* Home page route */}
          <Route path="/MyRecipe" element={<MyRecipe />} /> {/* MyRecipe page route */}
          <Route path="/Explore" element={<Explore />} /> {/* Explore page route */}
          <Route path="/FoodCart" element={<FoodCart />} /> {/* FoodCart page route */}
          <Route path="/ingredients/:recipeId?" element={<IngredientsList />} />
          <Route path="/shopping-list" element={<ShoppingList />} />

          {/* Add more routes as needed */}
        </Routes>
      </main>
    </div>
  );
}

export default App;

