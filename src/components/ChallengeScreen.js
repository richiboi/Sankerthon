import React from "react";
import { Link } from "react-router-dom";
import "./../ChallengeScreen.css";
import Leaderboard from "./leaderboard/Leaderboard";

export default function ChallengeScreen() {
  return (
    <div className="challenge-wrapper">
      <div className="challenge-container">
        <h4 id="above-sankerthon">Welcome to the</h4>
        <h1 id="sankerthon">Sankerthon</h1>
        <ul className="category-links">
          <li>
            <Link to="/buzzer">
              <span>Buzzer</span>
            </Link>
          </li>
          <li>
            <Link to="/quiz">
              <span>Quiz</span>
            </Link>
          </li>
          <li>
            <Link to="/ooo">
              <span>Odd one out</span>
            </Link>
          </li>
        </ul>
      </div>
      <Leaderboard />
    </div>
  );
}
