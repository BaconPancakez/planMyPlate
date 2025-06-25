// src/pages/HomePage.jsx
import React from "react";
import "./Home.css";
import placeholderImage from "../assets/placeholder.jpg";
import Postbox from "../components/Postbox";

const HomePage = () => {
  return (
    <div className="home-wrapper">
      <div className="home-content">
        <div className="top-wrapper">
          <div className="image-section">
            <img src={placeholderImage} alt="Random dish" />
            <p className="caption">Random picture every log in</p>
          </div>
          <div className="about-section">
            <h2>About Us</h2>
            <p>Welcome to PlanMyPlate!</p>
          </div>
        </div>

        <div className="recipe-section horizontal-recipes">
          <Postbox limit={3} showAddBox={false} />
        </div>

        <footer className="footer">@BitByBit</footer>
      </div>
    </div>
  );
};

export default HomePage;