import React, { useState, useEffect } from "react";
import firebase from "./../../firebase";
import styles from "./../../QuestionScreen.module.css";

import Timer from "./Timer";
import ScoreCounter from "./ScoreCounter";
import QuestionBox from "./QuestionBox";
import AnswerBoxGrid from "./AnswerBoxGrid";
import QuizInput from "./QuizInput";

import { QuestionContext } from "./QuestionContext";

const db = firebase.firestore();

export default function QuestionScreen({ category, isBuzzer }) {
  const [questions, setQuestions] = useState([]);
  const [questionStatus, setQuestionStatus] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [isQuestionComplete, setIsQuestionComplete] = useState(false);
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [score, setScore] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [maxTime] = useState(10);
  const [timeCounter, setTimeCounter] = useState(100);

  //Hook to load questions from database, and get uid. Sets loaded to true
  useEffect(() => {
    (async () => {
      //Get questions
      const questionSnapshot = await db
        .collection("Questions")
        .where("category", "==", category)
        .get();
      setQuestions(
        questionSnapshot.docs.map((doc) => {
          if (isBuzzer) {
            let question = {
              ...doc.data(),
              correctAnswer: doc.data().answers[0],
            };
            shuffleArray(question.answers);
            return question;
          } else {
            return doc.data();
          }
        })
      );

      //Set loaded and the maxTime counter
      setIsLoaded(true);
      setTimeCounter(maxTime);
    })();
  }, []);

  const nextQuestion = () => {
    setIsQuestionComplete(false);
    setCurrIndex(currIndex + 1);
    setTimeCounter(maxTime);
    setStartTime(new Date().getTime());

    console.log(currIndex);
    //If complete
    if (currIndex + 1 >= questions.length) {
      uploadQuestionStatus();
    }
  };

  const selectAnswer = (answer) => {
    const isCorrect = isBuzzer
      ? answer === questions[currIndex].correctAnswer
      : questions[currIndex].answers.includes(answer);

    const timeTaken = new Date().getTime() - startTime;
    const newScore = isCorrect ? calculateScore(timeTaken) : 0;

    setQuestionStatus([
      ...questionStatus,
      {
        correct: isCorrect,
        score: newScore,
        time_taken: timeTaken,
        answer_picked: answer,
        category,
        question_num: questions[currIndex].question_num,
      },
    ]);
    setScore(score + newScore);
    setIsQuestionComplete(true);
  };

  const calculateScore = (time) => {
    return Math.floor(700 * Math.exp(-time / 25000) + 500);
  };

  const uploadQuestionStatus = async () => {
    setIsUploading(true);

    //Upload the questiondata documents
    const uid = firebase.auth().currentUser.uid;
    let questionDataColRef = db.collection(`/Users/${uid}/question_data/`);

    let promises = questionStatus.map(async (question) => {
      let questionRef = questionDataColRef.doc(
        `${category}_${question.question_num}`
      );
      return await questionRef.set(question);
    });
    await Promise.all(promises);

    //Update the aggregated User document
    let userRef = db.doc(`/Users/${uid}`);
    let scoreUpdate = {};
    scoreUpdate[`category_scores.${category}`] = score;
    console.log(scoreUpdate)
    await userRef.update(scoreUpdate);

    setIsUploading(false);
  };

  if (!isLoaded) {
    return (
      <div className={styles.loadContainer}>
        <h1>Fetching questions</h1>
      </div>
    );
  } else if (currIndex === questions.length) {
    return (
      <div>
        {isUploading ? (
          <h1>Uploading...</h1>
        ) : (
          <h1>Thanks for competing in the Sankerthon!</h1>
        )}
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
          setScore,
          selectAnswer,
          maxTime,
        }}
      >
        <div className={styles.container}>
          <h1>{isBuzzer ? "BUZZER ROUND" : "QUIZ ROUND"}</h1>
          <Timer />
          <ScoreCounter />

          <div className={styles.questionContainer}>
            <QuestionBox str={questions[currIndex].html_str} />
            {isBuzzer ? (
              <AnswerBoxGrid answers={questions[currIndex].answers} />
            ) : (
              <QuizInput />
            )}
          </div>
          <button
            className={styles.nextButton}
            onClick={nextQuestion}
            style={{ visibility: isQuestionComplete ? "visible" : "hidden" }}
          >
            Next
          </button>
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
