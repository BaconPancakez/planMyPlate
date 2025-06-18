import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaUser, FaUtensils, FaShoppingCart, FaSearch, FaCog } from "react-icons/fa";
import "./NavBar.css";

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="navbar-container" style={{ position: 'relative', zIndex: isNavOpen ? 1100 : 999 }}>
      {/* Toggle Button */}
      <button className="hamburger-btn" onClick={() => setIsNavOpen(!isNavOpen)}>
        {isNavOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <nav className={`sidebar ${isNavOpen ? "expanded" : "collapsed"}`}>
        {/* Profile (optional) */}
        {isNavOpen && (
          <div className="profile">
            <img src="./src/assets/pfp.png" alt="Profile" />
            <p>Username</p>
          </div>
        )}

        {/* Navigation Items */}
        <ul>
          <li><FaHome /> {isNavOpen && <span>Home</span>}</li>
          <li><FaUser /> {isNavOpen && <span>My Profile</span>}</li>
          <li><FaUtensils /> {isNavOpen && <span>My Recipes</span>}</li>
          <li><FaSearch /> {isNavOpen && <span>Explore</span>}</li>
          <li><FaShoppingCart /> {isNavOpen && <span>Shopping List</span>}</li>
        </ul>
      </nav>
    </div>
  );
}
