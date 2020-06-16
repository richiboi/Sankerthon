import React, { useContext, useState, useEffect } from "react";
import { QuestionContext } from "./QuestionContext";
import styles from "./../../QuestionScreen.module.css";

export default function AnswerBox({ answer }) {
  const {
    isQuestionComplete,
    questions,
    currIndex,
    selectAnswer,
    category
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
      className={`${styles.answerBox} ${category === "ooo" ? styles.ooo : ""}`}
      onClick={onClick}
      style={{ pointerEvents, backgroundColor }}
    >
      <p>{answer}</p>
    </div>
  );
}
