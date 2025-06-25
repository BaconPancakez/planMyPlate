// src/pages/EntryPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import { validateUserSession } from "../utils/authHandlers";

export default function EntryPage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const isValidSession = await validateUserSession(navigate);
        if (!isValidSession) {
          setShowLogin(true);
        }
      } catch (error) {
        console.error("Error validating session:", error);
        setShowLogin(true);
      } finally {
        setChecking(false);
      }
    };

    checkSession();
  }, [navigate]);

  if (checking) return <div>Loading...</div>;

  return showLogin ? <LoginPage /> : null;
}
