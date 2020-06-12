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
          placeholder="Enter answer"
          value={answerField}
          onChange={(e) => setAnswerField(e.target.value)}
          disabled={isQuestionComplete}
        />
        <button
          type="submit"
          disabled={isQuestionComplete}
          className={buttonClasses}
        >
          <span>Submit</span>
          <div className={styles.success}>
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink"
              enableBackground="new 0 0 29.756 29.756"
              viewBox="0 0 29.756 29.756"
            >
              <path d="M29.049 5.009l-.859-.858a2.434 2.434 0 00-3.434 0L10.172 18.737l-5.175-5.173a2.433 2.433 0 00-3.432.001l-.858.857a2.437 2.437 0 000 3.433l7.744 7.752a2.437 2.437 0 003.433 0L29.049 8.442a2.438 2.438 0 000-3.433z"></path>
            </svg>
          </div>
        </button>
      </form>
    </div>
  );
}
