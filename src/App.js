import React, { useState, useEffect } from "react";
import "./App.css";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebase from "./firebase";

import ChallengeScreen from "./components/ChallengeScreen";
import HomeScreen from "./components/HomeScreen";
import QuestionScreen from "./components/questions/QuestionScreen";

import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setisLoggedIn(!!user);
      if (user !== null) {
        if (/@rchk.edu.hk/.test(user.email)) {
          setIsAuthorized(true);
        }
      }
    });
  });

  if (isLoggedIn === null) {
    return <LoadingScreen />;
  }
  // else if (isLoggedIn && !isAuthorized) {
  //   return (
  //     <div className="whole-screen-container">
  //       <h1>Not authorized. Please use an RCHK email</h1>
  //     </div>
  //   );
  // }
  else {
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
        <Route
          exact
          path="/buzzer"
          render={(props) => (
            <QuestionScreen category="buzzer" isBuzzerType={true} />
          )}
        />
        <Route
          exact
          path="/quiz"
          render={(props) => (
            <QuestionScreen category="quiz" isBuzzerType={false} />
          )}
        />
        <Route
          exact
          path="/ooo"
          render={(props) => (
            <QuestionScreen category="ooo" isBuzzerType={true} />
          )}
        />
        <Route exact path="/loading" render={(props) => <LoadingScreen />} />
      </Router>
    );
  }
}

export default App;
