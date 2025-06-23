// src/pages/HomePage.jsx
import React from "react";
import "./Home.css";
import placeholderImage from "../assets/placeholder.jpg";

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

        <div className="recipe-section">
          <div className="recipe-card">Public recipe 1 (best one)</div>
          <div className="recipe-card">Public recipe 2nd best</div>
          <div className="recipe-card">Public recipe 3rd best</div>
        </div>

        <footer className="footer">@BitByBit</footer>
      </div>
    </div>
  );
};

export default HomePage;
