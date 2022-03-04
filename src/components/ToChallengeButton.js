import React from 'react'
import { Link } from "react-router-dom";

export default function ToChallengeButton() {
  return (
    <div className="challenge-button">
      <Link to="/challenge">Return to challenges</Link>
    </div>
  )
}
