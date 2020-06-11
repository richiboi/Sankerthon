import React, {useContext} from 'react'
import AnswerBox from './AnswerBox'
import {QuestionContext} from './QuestionContext'

export default function AnswerBoxGrid({answers}) {
  const {styles} = useContext(QuestionContext)
  return (
    <div className={styles.answerGrid}>
      {answers.map((answer) => <AnswerBox answer={answer} key={answer} />)}
    </div>
  )
}
