// Importing necessary libraries, components, and styles
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/authHandlers";

// Import Icon for nav bar
// https://react-icons.github.io/react-icons/ <- if ya wanna change the icon
import { FaBars, FaTimes, FaHome, FaUser, FaUtensils, FaShoppingCart, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { RiFridgeFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";

// Refer to the .jsx for info
import { UIContext } from "../contexts/UIContext";

import "./NavBar.css";

// The NavBar component represents the navigation bar with a collapsible sidebar
export default function NavBar() {
  const { isNavOpen, setIsNavOpen } = useContext(UIContext); // Accessing UI context for navigation state
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  
  

  return (
    <div className={`navbar-container ${isNavOpen ? "expanded" : "collapsed"}`}>
      {/* Toggle Button */}
      <button
        className="hamburger-btn"
        onClick={() => setIsNavOpen(!isNavOpen)} // Toggles the sidebar
      >
        {isNavOpen ? <FaTimes /> : <FaBars />} {/* Icon changes based on sidebar state */}
      </button>

      {/* Sidebar */}
      <nav className={`sidebar ${isNavOpen ? "expanded" : "collapsed"}`}> {/* Sidebar container */}
        {/* Profile Section */}
        {isNavOpen && (
          <div className="profile"> {/* Profile section displayed when sidebar is expanded */}
            <img src="./src/assets/pfp.png" alt="Profile" />
            <p>Plan My Plate</p>
          </div>
        )}

        {/* Navigation Items */}
        <ul>
          <li>
            <Link to="/home">
              <div className={`nav-item ${isNavOpen ? "expanded" : "collapsed"}`}> {/* Navigation item */}
                <FaHome /> {isNavOpen && <span>Home</span>}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/myprofile">
              <div className={`nav-item ${isNavOpen ? "expanded" : "collapsed"}`}>
                <FaUser /> {isNavOpen && <span>My Profile</span>}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/Inventory">
              <div className={`nav-item ${isNavOpen ? "expanded" : "collapsed"}`}>
                <RiFridgeFill /> {isNavOpen && <span>My Inventory</span>}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/MyRecipe">
              <div className={`nav-item ${isNavOpen ? "expanded" : "collapsed"}`}>
                <FaUtensils /> {isNavOpen && <span>My Recipes</span>}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/Explore">
              <div className={`nav-item ${isNavOpen ? "expanded" : "collapsed"}`}>
                <FaSearch /> {isNavOpen && <div>Explore</div>}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/FoodCart">
              <div className={`nav-item ${isNavOpen ? "expanded" : "collapsed"} `}>
                <SlCalender /> {isNavOpen && <span>My Meal Plan</span>}
              </div>
            </Link>
          </li>
          <li>  
            <Link to="/shopping-list">
              <div className={`nav-item ${isNavOpen ? "expanded" : "collapsed"}`}>
                <FaShoppingCart /> {isNavOpen && <span>Shopping List</span>}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/Login" onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}>
              <div className={`nav-item ${isNavOpen ? "expanded" : "collapsed"}`}>
                <FaSignOutAlt /> {isNavOpen && <span>Log Out</span>}
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
