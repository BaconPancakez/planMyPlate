import './App.css';
import Explore from './pages/Explore';
import MyRecipe from './pages/MyRecipe.jsx';
import NavBar from './components/NavBar';
import Inventory from './pages/Inventory';
import FoodCart from './pages/FoodCart.jsx';
import IngredientsList from './pages/IngredientsList';
import ShoppingList from './pages/ShoppingList';
import EntryPage from './pages/EntryPage.jsx';
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MyProfile from "./pages/MyProfile";
import HomePage from "./pages/HomePage";
import { localStorage } from './utils/localStorage';
import { validateUserSession } from "./utils/authHandlers";

// 👇 Actual app
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.get("username");

  useEffect(() => {
    validateUserSession(navigate, location.pathname); // Pass current path to session validation
  }, [location.pathname, navigate]);

  // 👇 List of routes that shouldn't show the NavBar
  const hideNavBarOnRoutes = ["/", "/login"];
  const shouldHideNavBar = hideNavBarOnRoutes.includes(location.pathname);

  return (
    
    <div className="layout"> {/* Layout container for the app */}
      {!shouldHideNavBar && <NavBar username={username}/>} {/* Conditionally render NavBar */}
      <main className="main-content"> {/* Main content area */}

        <Routes> {/* Defines the routes for the application */}
          <Route path="/" element={<EntryPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/home" element={<div className='header-padding'> <HomePage /> </div>} />
          <Route path="/myprofile" element={<div className='header-padding'> <MyProfile /> </div>} />
          <Route path="/Inventory/*" element={ <Inventory />} /> {/* Inventory page route */}
          <Route path="/MyRecipe" element={<div className='header-padding'> <MyRecipe /> </div>} /> {/* MyRecipe page route */}
          <Route path="/Explore" element={<div className='header-padding'> <Explore /> </div>} /> {/* Explore page route */}
          <Route path="/FoodCart" element={<div className='header-padding'> <FoodCart /> </div>} /> {/* FoodCart page route */}
          <Route path="/ingredients/:recipeId?" element={<div className='header-padding'> <IngredientsList /> </div>} />
          <Route path="/shopping-list" element={<div className='header-padding'> <ShoppingList /> </div>} />
        </Routes>
      </main>
    </div>
  );
}
localStorage.logAll();  

export default App;

