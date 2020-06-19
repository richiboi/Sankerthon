import React from 'react'
import {QuestionContext} from './QuestionContext'
import styles from "./../../QuestionScreen.module.css";

export default function ScoreCounter({score}) {

  return (
    <div className={styles.scoreContainer}>
      <p>{score}</p>
    </div>
  )
}
