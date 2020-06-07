import React, { useContext } from "react";
import { QuestionContext } from "./QuestionContext";

export default function QuestionBox({ str }) {
  const { questionStatus, isQuestionComplete } = useContext(QuestionContext);

  if (isQuestionComplete) {
    const isCorrect = questionStatus[questionStatus.length - 1].score > 0;
    const backgroundColor = isCorrect ? "#66CC00" : "#CD5555";

    return (
      <div className="question-box-container" style={{ backgroundColor }}>
        <h1>{isCorrect?'+':''}{questionStatus[questionStatus.length - 1].score}</h1>
      </div>
    );
  } else {
    return (
      <div className="question-box-container">
        <h3>{str}</h3>
      </div>
    );
  }
}
