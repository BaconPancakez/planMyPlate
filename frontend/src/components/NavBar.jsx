// Importing necessary libraries, components, and styles
import { useContext } from "react";
import { Link } from "react-router-dom";

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

  return (
    <div
      className="navbar-container"
      style={{ position: "relative", zIndex: isNavOpen ? 1100 : 999 }}
    >
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
            <p>Username</p>
          </div>
        )}

        {/* Navigation Items */}
        <ul>
          <li>
            <Link to="/">
              <div className={`nav-item ${isNavOpen ? "expanded" : "collapsed"}`}> {/* Navigation item */}
                <FaHome /> {isNavOpen && <span>Home</span>}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/">
              <div className={`nav-item ${isNavOpen ? "expanded" : "collapsed"}`}>
                <FaUser /> {isNavOpen && <span>My Profile</span>}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/">
              <div className={`nav-item ${isNavOpen ? "expanded" : "collapsed"}`}>
                <RiFridgeFill /> {isNavOpen && <span>My Inventory</span>}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/">
              <div className={`nav-item ${isNavOpen ? "expanded" : "collapsed"}`}>
                <FaUtensils /> {isNavOpen && <span>My Recipes</span>}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/Explore">
              <div className={`nav-item ${isNavOpen ? "expanded" : "collapsed"}`}>
                <FaSearch /> {isNavOpen && <span>Explore</span>}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/">
              <div className={`nav-item ${isNavOpen ? "expanded" : "collapsed"} `}>
                <SlCalender /> {isNavOpen && <span>My Meal Plan</span>}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/">
              <div className={`nav-item ${isNavOpen ? "expanded" : "collapsed"}`}>
                <FaShoppingCart /> {isNavOpen && <span>Shopping List</span>}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/">
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
