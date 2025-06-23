import './App.css';
import Explore from './pages/Explore';
import MyRecipe from './pages/MyRecipe.jsx';
import NavBar from './components/NavBar';
import FoodCart from './pages/FoodCart.jsx';
import IngredientsList from './pages/IngredientsList';
import ShoppingList from './pages/ShoppingList';
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MyProfile from "./pages/MyProfile";
import HomePage from "./pages/HomePage";


// 👇 Actual app
function App() {
  const location = useLocation();

  // 👇 List of routes that shouldn't show the NavBar
  const hideNavBarOnRoutes = ["/", "/login"];
  const shouldHideNavBar = hideNavBarOnRoutes.includes(location.pathname);

  return (
    <div className="layout">
      {!shouldHideNavBar && <NavBar />} {/* Conditionally render NavBar */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/MyRecipe" element={<MyRecipe />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/FoodCart" element={<FoodCart />} />
          <Route path="/ingredients/:recipeId?" element={<IngredientsList />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;


