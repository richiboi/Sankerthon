import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ChallengeScreen from "./components/ChallengeScreen";
import HomeScreen from "./components/HomeScreen";
import { Redirect } from "react-router";

import firebase from "./firebase";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setisLoggedIn(!!user);
    });
  });

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  } else {
    return (
      <Router>
        {isLoggedIn ? null : <Redirect to="/" />}
        <Route
          exact
          path="/"
          render={(props) => {
            return isLoggedIn ? <Redirect to="/challenge" /> : <HomeScreen />;
          }}
        />
        <Route
          exact
          path="/challenge"
          render={(props) => <ChallengeScreen />}
        />
      </Router>
    );
  }
}

export default App;
