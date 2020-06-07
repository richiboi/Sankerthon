import React, {useContext} from 'react'
import {QuestionContext} from './QuestionContext'

export default function ScoreCounter() {
  const {score} = useContext(QuestionContext)

  return (
    <div className="score-container">
      <p>{score}</p>
    </div>
  )
}
