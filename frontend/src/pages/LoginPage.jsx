import React, { useState } from "react";
import "./LoginPage.css";
import fruitImage from "../assets/login_page.jpg"; // adjust path if needed
import { useNavigate } from "react-router-dom";
import GoogleSignIn from "../components/GoogleSignIn";
import { handleGoogleSignIn, handleManualLogin } from "../utils/authHandlers";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }
    console.log("Logging in:", { email, password });
    await handleManualLogin(email, password, navigate);
  };

  const handleGoogleSignInCallback = async (user) => {
    await handleGoogleSignIn(user, navigate);
  };
  
  return (
    <div
      className="login-background"
      style={{ backgroundImage: `url(${fruitImage})` }}
    >
      <div className="login-form">
        <h2>Welcome Back!</h2>
        <p>Don't have an account? <a href="#">Sign Up</a></p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="#" className="forgot">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>

        <div className="or">OR</div>
        <div className="socials">
          <GoogleSignIn onSignIn={handleGoogleSignInCallback} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;