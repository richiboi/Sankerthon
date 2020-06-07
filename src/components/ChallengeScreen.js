import React from 'react'
import {Link} from 'react-router-dom'

export default function ChallengeScreen() {
  return (
    <div>
      <h1>Challenge screen</h1>
      <Link to="/buzzer">Buzzer questions</Link>
      <br/>
      <Link to="/quiz">Quiz questions</Link>
      <br/>
      <Link to="/make24">Make 24 questions</Link>
    </div>
  )
}
