import React, { useContext, useEffect } from "react";
import { QuestionContext } from "./QuestionContext";

export default function Timer() {
  const {
    timeCounter,
    setTimeCounter,
    isQuestionComplete,
    selectAnswer,
    styles
  } = useContext(QuestionContext);

  //Timer logic
  useEffect(() => {
    if (!isQuestionComplete) {
      const timer =
        !isQuestionComplete &&
        setInterval(() => setTimeCounter(timeCounter - 1), 1000);
      if (timeCounter === 0) {
        console.log("times up");
        selectAnswer(null)
      }
      return () => clearInterval(timer);
    }
  }, [timeCounter, isQuestionComplete]);

  return (
    <div className={styles.timerContainer}>
      <p>{timeCounter}</p>
    </div>
  );
}
