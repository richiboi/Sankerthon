import React, { useState, useContext, useEffect } from "react";
import { QuestionContext } from "./QuestionContext";
import styles from "./../../QuestionScreen.module.css";

export default function QuizInput() {
  const [answerField, setAnswerField] = useState("");
  const [buttonClasses, setButtonClasses] = useState("");
  const { selectAnswer, isQuestionComplete, currIndex } = useContext(
    QuestionContext
  );

  const submitAnswer = (e) => {
    e.preventDefault();
    setButtonClasses(buttonClasses == "" ? styles.is_active : "");
    selectAnswer(answerField);
  };

  useEffect(() => {
    setAnswerField("");
  }, [currIndex]);

  return (
    <div className={styles.inputContainer}>
      <form onSubmit={submitAnswer} className={styles.answerForm}>
        <input
          type="text"
          placeholder="Your answer here..."
          value={answerField}
          id="answerInput"
          onChange={(e) => setAnswerField(e.target.value)}
          disabled={isQuestionComplete}
          className={styles.answerInput}
        />
        <button
          type="submit"
          disabled={isQuestionComplete}
          className={styles.submitBtn}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
