import React from 'react'
import AnswerBox from './AnswerBox'

export default function AnswerBoxGrid({answers}) {
  return (
    <div className='answer-grid'>
      {answers.map((answer) => <AnswerBox answer={answer} key={answer} />)}
    </div>
  )
}
