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
              <span>Buzzer questions</span>
            </Link>
          </li>
          <li>
            <Link to="/quiz">
              <span>Quiz questions</span>
            </Link>
          </li>
          <li>
            <Link to="/make24">
              <span>Make 24 questions</span>
            </Link>
          </li>
        </ul>
      </div>
      <Leaderboard />
    </div>
  );
}
