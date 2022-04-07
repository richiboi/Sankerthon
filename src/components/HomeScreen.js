import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import "./HomeScreen.css";
import { FaGithub } from "react-icons/fa";

export default function HomeScreen() {
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    signInSuccessUrl: "/challenge",
  };

  return (
    <React.Fragment>
      <div className="home-area">
        <a
          className="github-logo-wrapper"
          href="https://github.com/richiboi/Sankerthon"
        >
          <FaGithub style={{ width: "2.5em", height: "2.5em" }} fill="white" />
        </a>
        <ul className="home-circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="home-container">
        <h1>Sankerthon</h1>
        <h3>Login now to play!</h3>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </React.Fragment>
  );
}
