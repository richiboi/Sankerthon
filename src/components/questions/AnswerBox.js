import React, { useContext, useState, useEffect } from "react";
import { QuestionContext } from "./QuestionContext";

export default function AnswerBox({ answer }) {
  const {
    isQuestionComplete,
    setIsQuestionComplete,
    questions,
    currIndex,
    questionStatus,
    setQuestionStatus,
    startTime,
    score,
    setScore,
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

  const selectAnswer = () => {
    const timeTaken = new Date().getTime() - startTime;
    const isCorrect = answer === questions[currIndex].correctAnswer
    const newScore = isCorrect ? calculateScore(timeTaken) : 0

    setQuestionStatus([
      ...questionStatus,
      {
        correct: isCorrect,
        score: newScore,
        time_taken: timeTaken,
        answer_picked: answer,
      },
    ]);

    setScore(score + newScore)

    !isCorrect && setBackgroundColor("#FF3519") // if not correct then change bg to red
    setIsQuestionComplete(true);
  };

  const calculateScore = (time) => {
    return Math.floor(700 * Math.exp(-time / 25000) + 500);
  };

  return (
    <div
      className="answer-box"
      onClick={selectAnswer}
      style={{ pointerEvents, backgroundColor }}
    >
      <p>{answer}</p>
    </div>
  );
}
