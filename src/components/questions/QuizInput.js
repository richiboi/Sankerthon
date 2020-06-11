import React, { useState, useContext, useEffect } from "react";
import { QuestionContext } from "./QuestionContext";
import styles from "./../../QuestionScreen.module.css"

export default function QuizInput() {
  const [answerField, setAnswerField] = useState("");
  const { selectAnswer, isQuestionComplete, currIndex } = useContext(QuestionContext);

  const submitAnswer = (e) => {
    e.preventDefault();
    selectAnswer(answerField);
  };

  useEffect(() => {
    setAnswerField('')
  }, [currIndex])

  return (
    <div className={styles.inputContainer}>
      <form onSubmit={submitAnswer} className={styles.answerForm}>
        <input
          type="text"
          placeholder="Enter answer"
          value={answerField}
          onChange={(e) => setAnswerField(e.target.value)}
          disabled={isQuestionComplete}
        />
        <input type="submit" value="Submit" disabled={isQuestionComplete} />
      </form>
    </div>
  );
}
