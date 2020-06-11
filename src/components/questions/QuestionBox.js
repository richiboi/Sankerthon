import React, { useContext } from "react";
import { QuestionContext } from "./QuestionContext";

export default function QuestionBox({ str }) {
  const { questionStatus, isQuestionComplete, maxTime } = useContext(QuestionContext);

  const msgs = {
    correct: ["You go!", "Great job!", "Ms. Sanker's proud!", "How Sankerful!"],
    wrong: ["Almost....", "So close!", "Yikes!", "Did you even try ;/"],
    timeUp: ["Time's up!", "Better hurry next time!"]
  };

  const pickRandom = list => {
    return list[Math.floor(Math.random() * list.length)]
  }

  if (isQuestionComplete) {
    const isCorrect = questionStatus[questionStatus.length - 1].score > 0;
    const backgroundColor = isCorrect ? "#66CC00" : "#CD5555";

    let msg = pickRandom(isCorrect? msgs.correct : msgs.wrong)
    if (questionStatus[questionStatus.length - 1].time_taken >= maxTime * 1000) {
      msg = pickRandom(msgs.timeUp)
    }
    
    return (
      <div className="question-box-container" style={{ backgroundColor }}>
        <h4>{msg}</h4>
        <h1>
          {isCorrect ? "+" : ""}
          {questionStatus[questionStatus.length - 1].score}
        </h1>
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
