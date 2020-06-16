import React, { useState, useEffect } from "react";
import firebase from "./../firebase";
import { Link } from "react-router-dom";
import "./../ChallengeScreen.css";
import Leaderboard from "./leaderboard/Leaderboard";

const db = firebase.firestore();

export default function ChallengeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryComplete, setCategoryComplete] = useState({});

  useEffect(() => {
    getCategoryStatus();
  }, []);

  const getCategoryStatus = async () => {
    const uid = firebase.auth().currentUser.uid;
    let userDataDoc = await db.doc(`/Users/${uid}`).get();
    let categoryScores = userDataDoc.data().category_scores;

    for (const category in categoryScores) {
      if (categoryScores.hasOwnProperty(category)) {
        categoryScores[category] = categoryScores[category] !== null;
      }
    }
    console.log(categoryScores);

    setCategoryComplete(categoryScores);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="challenge-screen-wrapper">
      <div className="challenge-container">
        <h4 id="above-sankerthon">Welcome to the</h4>
        <h1 id="sankerthon">Sankerthon</h1>
        <ul className="category-links">
          <li className={categoryComplete.buzzer? "disable-challenge" : ''}>
            <Link to="/buzzer">Buzzer</Link>
          </li>
          <li className={categoryComplete.quiz? "disable-challenge" : ''}>
            <Link to="/quiz">Quiz</Link>
          </li>
          <li className={categoryComplete.ooo? "disable-challenge" : ''}>
            <Link to="/ooo">Odd one out</Link>
          </li>
        </ul>
        <p>Complete all questions to get on the Leaderboard!</p>
      </div>
      <Leaderboard />
    </div>
  );
}
