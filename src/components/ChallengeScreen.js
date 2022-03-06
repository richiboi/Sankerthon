import React, { useState, useEffect, useCallback } from "react";
import firebase from "./../firebase";
import { Link } from "react-router-dom";
import "./../ChallengeScreen.css";
import Leaderboard from "./leaderboard/Leaderboard";
import LoadingScreen from "./LoadingScreen";
import { FaGithub } from "react-icons/fa";

const db = firebase.firestore();

export default function ChallengeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryComplete, setCategoryComplete] = useState({});

  const getCategoryStatus = useCallback(async () => {
    try {
      const uid = firebase.auth().currentUser.uid;
      let userDataDoc = await db.doc(`/Users/${uid}`).get();
      let categoryScores = userDataDoc.data().category_scores;

      for (const category in categoryScores) {
        if (categoryScores.hasOwnProperty(category)) {
          categoryScores[category] = categoryScores[category] !== null;
        }
      }
      categoryScores.allFinished = userDataDoc.data().total_score !== null;
      console.log(categoryScores);

      setCategoryComplete(categoryScores);
      setIsLoading(false);
    } catch {
      console.log("needs a rerun");
      setTimeout(() => {
        getCategoryStatus();
      }, 1500);
    }
  }, []);

  useEffect(() => {
    getCategoryStatus();
  }, [getCategoryStatus]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="challenge-screen-wrapper">
      <a
        className="github-logo-wrapper"
        href="https://github.com/richiboi/Sankerthon"
      >
        <FaGithub style={{ width: "2.5em", height: "2.5em" }} fill="white" />
      </a>
      <div className="challenge-container">
        <h4 id="above-sankerthon">Welcome to the</h4>
        <h1 id="sankerthon">Sankerthon</h1>
        <ul className="category-links">
          <li className={categoryComplete.buzzer ? "disable-challenge" : ""}>
            <Link to="/buzzer">Buzzer</Link>
          </li>
          <li className={categoryComplete.quiz ? "disable-challenge" : ""}>
            <Link to="/quiz">Quiz</Link>
          </li>
          <li className={categoryComplete.ooo ? "disable-challenge" : ""}>
            <Link to="/ooo">Odd one out</Link>
          </li>
        </ul>
        <p>
          {categoryComplete.allFinished
            ? "All challenges completed! Thanks for playing."
            : "Complete all challenges to get on the Leaderboard!"}
        </p>
      </div>
      <Leaderboard />
    </div>
  );
}
