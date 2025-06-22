// Importing necessary components and styles
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Explore from './pages/Explore';
import Home from './pages/Home';
import MyRecipe from './pages/MyRecipe.jsx'
import NavBar from './components/NavBar';
import Inventory from './pages/Inventory';
import FoodCart from './pages/FoodCart.jsx';
import IngredientsList from './pages/IngredientsList';
import ShoppingList from './pages/ShoppingList';

// The App component serves as the root component of the application
function App() {
  return (
    <div className="layout"> {/* Layout container for the app */}
      <NavBar /> {/* Navigation bar displayed globally */}
      <main className="main-content"> {/* Main content area */}

        <Routes> {/* Defines the routes for the application */}
          <Route path="/" element={ <div className='header-padding'> <Home /> </div>}/> {/* Home page route */}
          <Route path="/Inventory/*" element={ <Inventory />} /> {/* Inventory page route */}
          <Route path="/MyRecipe" element={<div className='header-padding'> <MyRecipe /> </div>} /> {/* MyRecipe page route */}
          <Route path="/Explore" element={<div className='header-padding'> <Explore /> </div>} /> {/* Explore page route */}
          <Route path="/FoodCart" element={<div className='header-padding'> <FoodCart /> </div>} /> {/* FoodCart page route */}
          <Route path="/ingredients/:recipeId?" element={<div className='header-padding'> <IngredientsList /> </div>} />
          <Route path="/shopping-list" element={<div className='header-padding'> <ShoppingList /> </div>} />

          {/* Add more routes as needed */}
        </Routes>
      </main>
    </div>
  );
}

export default App;

