import React, { useContext, useEffect } from "react";
import { QuestionContext } from "./QuestionContext";

export default function Timer() {
  const {
    timeCounter,
    setTimeCounter,
    isQuestionComplete,
    setIsQuestionComplete,
  } = useContext(QuestionContext);

  //Timer logic
  useEffect(() => {
    if (!isQuestionComplete) {
      const timer =
        !isQuestionComplete &&
        setInterval(() => setTimeCounter(timeCounter - 1), 1000);
      if (timeCounter === 0) {
        console.log("times up");
        setIsQuestionComplete(true);
        setTimeCounter(60)
      }
      return () => clearInterval(timer);
    }
  }, [timeCounter, isQuestionComplete]);

  return (
    <div className="timer-container">
      <p>{timeCounter}</p>
    </div>
  );
}
