import React, { useState, useEffect } from "react";
import "./../../QuestionScreen.css";
import firebase from "./../../firebase";

import Timer from "./Timer";
import ScoreCounter from "./ScoreCounter";
import QuestionBox from "./QuestionBox";
import AnswerBoxGrid from "./AnswerBoxGrid";

import { QuestionContext } from "./QuestionContext";

const db = firebase.firestore();

export default function QuestionScreen() {
  const [questions, setQuestions] = useState([]);
  const [questionStatus, setQuestionStatus] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [isQuestionComplete, setIsQuestionComplete] = useState(false);
  const [timeCounter, setTimeCounter] = useState(60);
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [score, setScore] = useState(0)

  const category = "buzzer";

  //Hook to load questions from database. Sets loaded to true
  useEffect(() => {
    (async () => {
      const questionSnapshot = await db
        .collection("Questions")
        .where("category", "==", category)
        .get();
      setQuestions(
        questionSnapshot.docs.map((doc) => {
          let question = {
            ...doc.data(),
            correctAnswer: doc.data().answers[0],
          };
          shuffleArray(question.answers);
          return question;
        })
      );
      setIsLoaded(true);
    })();
  }, []);

  const nextQuestion = () => {
    setIsQuestionComplete(false);
    setCurrIndex(currIndex + 1);
    setTimeCounter(60);
    setStartTime(new Date().getTime());
  };

  if (!isLoaded) {
    return (
      <div className="load-container">
        <h1>Fetching questions</h1>
      </div>
    );
  } else if (currIndex === questions.length) {
    console.log(questionStatus);
    return (
      <div>
        <h1>Thanks for competing in the Sankerthon!</h1>
      </div>
    );
  } else {
    return (
      <QuestionContext.Provider
        value={{
          questions,
          questionStatus,
          setQuestionStatus,
          isQuestionComplete,
          setIsQuestionComplete,
          currIndex,
          setCurrIndex,
          timeCounter,
          setTimeCounter,
          startTime,
          score,
          setScore
        }}
      >
        <div>
          <Timer />
          <ScoreCounter />

          <div className="question-container">
            <QuestionBox str={questions[currIndex].html_str} />
            <AnswerBoxGrid answers={questions[currIndex].answers} />
            {isQuestionComplete && (
              <button className="next-button" onClick={nextQuestion}>
                Next
              </button>
            )}
          </div>
        </div>
      </QuestionContext.Provider>
    );
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
