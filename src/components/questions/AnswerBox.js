import React, { useContext, useState, useEffect } from "react";
import { QuestionContext } from "./QuestionContext";

export default function AnswerBox({ answer }) {
  const {
    isQuestionComplete,
    questions,
    currIndex,
    selectAnswer
  } = useContext(QuestionContext);

  const [pointerEvents, setPointerEvents] = useState("auto");
  const [backgroundColor, setBackgroundColor] = useState("");

  //Disable if question is complete
  useEffect(() => {
    if (isQuestionComplete) {
      setPointerEvents("none");
      // Show the correct answer regardless
      if (answer === questions[currIndex].correctAnswer) {
        setBackgroundColor("#1DC702");
      }
    }
  }, [isQuestionComplete]);

  const onClick = () => {

    // if not correct then change bg to red
    answer !== questions[currIndex].correctAnswer && setBackgroundColor("#FF3519")

    //Send select answer on the main loop
    selectAnswer(answer)
  }

  return (
    <div
      className="answer-box"
      onClick={onClick}
      style={{ pointerEvents, backgroundColor }}
    >
      <p>{answer}</p>
    </div>
  );
}
