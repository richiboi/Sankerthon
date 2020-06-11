import React, { useContext, useState, useEffect } from "react";
import { QuestionContext } from "./QuestionContext";

export default function AnswerBox({ answer }) {
  const {
    isQuestionComplete,
    questions,
    currIndex,
    selectAnswer,
    styles
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
    answer !== questions[currIndex].correctAnswer && setBackgroundColor("#FF3519")
    selectAnswer(answer)
  }

  return (
    <div
      className={styles.answerBox}
      onClick={onClick}
      style={{ pointerEvents, backgroundColor }}
    >
      <p>{answer}</p>
    </div>
  );
}
