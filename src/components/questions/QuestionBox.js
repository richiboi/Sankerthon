import React, { useContext } from "react";
import { QuestionContext } from "./QuestionContext";
import styles from "./../../QuestionScreen.module.css";

export default function QuestionBox({ str }) {
  const { questionStatus, isQuestionComplete, maxTime, isBuzzer } = useContext(
    QuestionContext
  );

  const msgs = {
    correct: ["You go!", "Great job!", "Ms. Sanker's proud!", "How Sankerful!"],
    wrong: ["Almost....", "So close!", "Yikes!", "Did you even try ;/"],
    timeUp: ["Time's up!", "Better hurry next time!"],
  };

  const pickRandom = (list) => {
    return list[Math.floor(Math.random() * list.length)];
  };

  if (isQuestionComplete) {
    const isCorrect = questionStatus[questionStatus.length - 1].score > 0;
    const background = isCorrect ? "#70B913" : "#CB2525";

    let msg = pickRandom(isCorrect ? msgs.correct : msgs.wrong);

    //If times up
    if (
      questionStatus[questionStatus.length - 1].time_taken >=
      maxTime * 1000
    ) {
      msg = pickRandom(msgs.timeUp);
    }

    return (
      <div style={{ background }} className={styles.questionContainer}>
        <h4>{msg}</h4>
        <h1>
          {isCorrect ? "+" : ""}
          {questionStatus[questionStatus.length - 1].score}
        </h1>
      </div>
    );
  } else {
    const background = isBuzzer
      ? "linear-gradient(267.93deg, #38b3da 0.17%, #5f42d6 99.86%)"
      : "linear-gradient(264.07deg, #EB6B35 0%, #B7D210 100%)";

    return (
      <div style={{background}} className={styles.questionContainer}>
        <h3>{str}</h3>
      </div>
    );
  }
}
