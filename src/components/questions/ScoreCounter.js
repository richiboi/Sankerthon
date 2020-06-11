import React, {useContext} from 'react'
import {QuestionContext} from './QuestionContext'
import styles from "./../../QuestionScreen.module.css";

export default function ScoreCounter() {
  const {score} = useContext(QuestionContext)

  return (
    <div className={styles.scoreContainer}>
      <p>{score}</p>
    </div>
  )
}
