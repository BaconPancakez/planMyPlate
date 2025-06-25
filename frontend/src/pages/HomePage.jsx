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
            <p>When you don't know what to cook, you can rely on Plan My Plate to find a recipe that is tailored to your tastes. You can also track your fridge inventory without having to rummage through your in-real-life fridge with a lot of pain. Additionally, you can have a shopping list that is personalised based on what meals you plan to whip up!</p>
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