import React, { useEffect, useState } from "react";
import "./Home.css";
import QuoteGenerator from "../components/QuoteGenerator";

const HomePage = () => {
  const [foodImage, setFoodImage] = useState("");

  // Fetch image from Foodish API once when component mounts
  useEffect(() => {
    const fetchRandomFoodImage = async () => {
      try {
        const response = await fetch("https://foodish-api.com/api/");
        const data = await response.json();
        setFoodImage(data.image);
      } catch (error) {
        console.error("Error fetching food image:", error);
      }
    };

    fetchRandomFoodImage();
  }, []);

  return (
    <div className="home-wrapper">
      <div className="home-content">
        <div className="top-wrapper">
          <div className="image-section">
              <img src={foodImage} alt="Random food image" className="food-img" />
          </div>
          <div className="about-section">
            <h2>About Us</h2>
            <p>Welcome to PlanMyPlate!</p>
          </div>
        </div>

        <div className="quote-section">
          <QuoteGenerator />
        </div>

        <footer className="footer">@BitByBit</footer>
      </div>
    </div>
  );
};

export default HomePage;