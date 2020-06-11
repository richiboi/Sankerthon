import React from 'react'
import AnswerBox from './AnswerBox'
import styles from "./../../QuestionScreen.module.css";

export default function AnswerBoxGrid({answers}) {
  return (
    <div className={styles.answerGrid}>
      {answers.map((answer) => <AnswerBox answer={answer} key={answer} />)}
    </div>
  )
}
