import { localStorage } from './localStorage';

// Define the backend base URL
const BASE_URL = import.meta.env.VITE_API_LINK

// Updated validation logic to fetch username if missing
const validateUserSession = async (navigate, currentPath) => {
  try {
    const id = localStorage.get("id");
    let username = localStorage.get("username");

    if (!id) {
      console.warn("Missing user ID in localStorage.");
      navigate("/login");
      return false;
    }

    // Fetch username if missing
    if (!username) {
      const response = await fetch(`${BASE_URL}/get-username`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.success && data.username) {
        username = data.username;
        localStorage.set("username", username);
      } else {
        console.error("Failed to fetch username from backend.");
        localStorage.remove("id");
        navigate("/login");
        return false;
      }
    }

    // Redirect based on currentPath
    if (currentPath && currentPath !== "/login") {
      navigate(currentPath); // Redirect to current path
    } else {
      navigate("/home"); // Default to home
    }

    console.log("User session validated successfully.");
    return true;
  } catch (error) {
    console.error("Error validating user session:", error);
    localStorage.remove("id");
    localStorage.remove("username");
    navigate("/login");
    return false;
  }
};

// Updated Google Sign-In logic
const handleGoogleSignIn = async (userInfo, navigate) => {
  try {
    const profileResponse = await fetch(`${BASE_URL}/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userInfo.name,
        email: userInfo.email,
        login_type: "google",
        allergy: [],
        about_me: "",
        img: userInfo.picture,
      }),
    });

    const profileData = await profileResponse.json();

    if (profileData && profileData.id) {
      localStorage.set("id", profileData.id);
      localStorage.set("username", userInfo.name);
      navigate("/home"); // Redirect to home
    } else {
      console.error("Error handling profile response:", profileData);
    }
  } catch (error) {
    console.error("Error handling Google Sign-In:", error);
  }
};

// Updated manual login logic to use the /manual-login endpoint and check password
const handleManualLogin = async (email, password, navigate) => {
  try {
    const response = await fetch(`${BASE_URL}/manual-login`, { // Use the correct manual-login endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Send only email and password
    });

    // Check for specific status codes
    if (response.status === 404) {
      // Invalid email or password
      const errorData = await response.json();
      alert(errorData.error || "Invalid email or password.");
      return; // Stop execution
    }

    if (!response.ok) {
      // Handle other potential HTTP errors
      console.error("HTTP error during manual login:", response.status);
      alert("Wrong username or password");
      return; // Stop execution
    }

    const profileData = await response.json();

    // Check if login was successful based on the response structure
    if (profileData && profileData.success && profileData.profile) {
      localStorage.set("id", profileData.profile.id); // Store id from the returned profile
      localStorage.set("username", profileData.profile.username); // Store username from the returned profile
      // localStorage.set("sessionToken", profileData.sessionToken); // Only set if backend provides a session token
      navigate("/home"); // Redirect to myprofile or desired page after successful login
    } else {
      // This case might happen if the response is 200 but doesn't have the expected structure
      console.error("Unexpected response structure during manual login:", profileData);
      alert("Login failed due to unexpected server response.");
    }
  } catch (error) {
    console.error("Error handling manual login:", error);
    alert("An error occurred during login. Please try again.");
  }
};

// Function to log out
const logout = (navigate) => {
  localStorage.remove('username')
  localStorage.remove('id')
  navigate("/"); // Redirect to login
};

export { handleGoogleSignIn, handleManualLogin, validateUserSession, logout };