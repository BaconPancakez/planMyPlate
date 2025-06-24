import { useEffect } from "react";

export default function GoogleSignIn() {
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "930225097594-v2k0tm06ghn8cj3en92ckemelvl7eoqb.apps.googleusercontent.com",
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
  }, []);

  function handleCredentialResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);

    const base64Url = response.credential.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const user = JSON.parse(atob(base64));
    console.log("User Info:", user);
  }

  return <button id="googleSignInDiv"></button>;
}
