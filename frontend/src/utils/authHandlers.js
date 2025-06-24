import { localStorage } from './localStorage';

// Define the backend base URL
const BASE_URL = "http://localhost:8080";

// Updated validation logic to fetch username if missing
const validateUserSession = async (navigate) => {
  try {
    const id = localStorage.get("id");
    let username = localStorage.get("username");

    if (!id) {
      navigate("/login"); // Redirect to login if no session data
      return;
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
        console.error("Failed to fetch username");
        localStorage.remove("id");
        navigate("/login");
        return;
      }
    }

    console.log("User session validated successfully");
  } catch (error) {
    console.error("Error validating user session:", error);
    localStorage.remove("id");
    localStorage.remove("username");
    navigate("/login");
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
        allergy: "None",
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

// Updated manual login logic
const handleManualLogin = async (email, password, navigate) => {
  try {
    const profileResponse = await fetch(`${BASE_URL}/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email.split("@")[0],
        email,
        password,
        login_type: "manual",
        allergy: "None",
        about_me: "",
        img: "https://example.com/default-profile.jpg",
      }),
    });

    const profileData = await profileResponse.json();

    if (profileData && profileData.id) {
      localStorage.set("id", profileData.id);
      localStorage.set("username", email.split("@")[0]);
      localStorage.set("sessionToken", profileData.sessionToken);
      navigate("/myprofile"); // Redirect to myprofile
    } else {
      console.error("Error handling profile response:", profileData);
    }
  } catch (error) {
    console.error("Error handling manual login:", error);
  }
};

// Function to log out
const logout = (navigate) => {
  localStorage.remove('username')
  localStorage.remove('id')
  navigate("/"); // Redirect to login
};

export { handleGoogleSignIn, handleManualLogin, validateUserSession, logout };
