import React, { useContext } from "react";
import { QuestionContext } from "./QuestionContext";
import AnswerBox from "./AnswerBox";
import styles from "./../../QuestionScreen.module.css";

export default function AnswerBoxGrid({ answers, questionNum }) {
  const { category } = useContext(QuestionContext);

  console.log(answers)
  return (
    <div
      className={`${styles.answerGrid} ${category === "ooo" ? styles.ooo : ""}`}
    >
      {answers.map((answer) => (
        <AnswerBox answer={answer} key={answer} />
      ))}
    </div>
  );
}
