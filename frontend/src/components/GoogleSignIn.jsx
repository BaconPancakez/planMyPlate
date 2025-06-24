import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleSignIn() {
  const navigate = useNavigate();

  const handleCredentialResponse = useCallback(
    (response) => {
      const base64Url = response.credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const user = JSON.parse(atob(base64));
      console.log("User Info:", user);
      navigate("/home");
    },
    [navigate]
  );

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      {
        theme: "outline",
        size: "large",
        text: "signin_with",
      }
    );
  }, [handleCredentialResponse]);

  return <div id="googleSignInDiv" className="google-sign-in"></div>;
}
