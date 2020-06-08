import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";


export default function HomeScreen() {
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    signInSuccessUrl: "/challenge",
  };
  
  return (
      <div>
        <h1>This is the homescreen. Welcome to the Sankerthon</h1>
        <h3>You are not signed in. Please do so below</h3>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
  );
}
