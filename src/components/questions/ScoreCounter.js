import React, {useContext} from 'react'
import {QuestionContext} from './QuestionContext'

export default function ScoreCounter() {
  const {score, styles} = useContext(QuestionContext)

  return (
    <div className={styles.scoreContainer}>
      <p>{score}</p>
    </div>
  )
}
