import React from "react";
import Timer from "./Timer"
import ScoreCounter from './ScoreCounter'
import QuestionBox from './QuestionBox'
import AnswerBoxGrid from './AnswerBoxGrid'

export default function QuestionScreen() {
  return (
    <div>
      <Timer />
      <ScoreCounter />
      <div className="question-container">
        <QuestionBox />
        <AnswerBoxGrid/>
      </div>
    </div>
  );
}
