import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { handleGoogleSignIn } from "../utils/authHandlers";

export default function GoogleSignIn() {
  const navigate = useNavigate();

  const handleCredentialResponse = useCallback(
    async (response) => {
      const base64Url = response.credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const user = JSON.parse(atob(base64));
      console.log("User Info:", user);

      try {
        await handleGoogleSignIn(user, navigate);
      } catch (error) {
        console.error("Error handling credential response:", error);
      }
    },
    [navigate]
  );

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-signin"),
      {
        theme: "outline",
        size: "large",
        text: "signin_with",
      }
    );
  }, [handleCredentialResponse]);

  return <div id="google-signin" className="google-sign-in"></div>;
}
