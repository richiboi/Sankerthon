import React, { useState, useEffect } from "react";
import firebase from "./../../firebase";
import styles from "./../../QuestionScreen.module.css";

import ScoreCounter from "./ScoreCounter";
import QuestionBox from "./QuestionBox";
import AnswerBoxGrid from "./AnswerBoxGrid";
import QuizInput from "./QuizInput";
import Timer from "./Timer";

import LoadingScreen from "./../LoadingScreen";
import ToChallengeButton from "./../ToChallengeButton"

import shapesImg from "./../../img/bgshapes.svg";

import { QuestionContext } from "./QuestionContext";

const db = firebase.firestore();

export default function QuestionScreen({ category, isBuzzerType }) {
  const [questions, setQuestions] = useState([]);
  const [questionStatus, setQuestionStatus] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isQuestionComplete, setIsQuestionComplete] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const [startTime, setStartTime] = useState(new Date().getTime());
  const [maxTime] = useState(60);
  const [timeCounter, setTimeCounter] = useState(100);
  const [score, setScore] = useState(0);

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
          if (isBuzzerType) {
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

      //Make sure it hasn't been played
      const uid = firebase.auth().currentUser.uid;
      let userDataDoc = await db.doc(`/Users/${uid}`).get();
      let categoryScores = userDataDoc.data().category_scores;

      if (categoryScores[category] !== null) {
        setHasPlayed(true);
      }

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
    const isCorrect = isBuzzerType
      ? answer === questions[currIndex].correctAnswer
      : isQuizAnswerCorrect(questions[currIndex].answers, answer);

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

  //Removes spaces and makes it case insensitive to make sure similar answers are correct
  const isQuizAnswerCorrect = (list, answer) => {
    let moddedList = list.map((item) => item.replace(" ", "").toUpperCase());
    let moddedAnswer = answer.replace(" ", "").toUpperCase();

    return moddedList.includes(moddedAnswer);
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
    console.log(scoreUpdate);
    await userRef.update(scoreUpdate);

    setIsUploading(false);
  };

  const shapeHueRotates = {
    buzzer: "0",
    quiz: "-120deg",
    ooo: "110deg",
  };

  const roundHeaders = {
    buzzer: "Buzzer Round",
    quiz: "Quiz Round",
    ooo: "Odd One Out Round",
  };

  if (!isLoaded) {
    return <LoadingScreen />;
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
  } else if (hasPlayed) {
    return (
      <div className="whole-screen-container">
        <h1>This round has already been played</h1>
        
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
          isBuzzerType,
          category,
        }}
      >
        <h1 className={styles.roundHeader}>{roundHeaders[category]}</h1>
        <ScoreCounter />
        <Timer />

        <div className={styles.qnaContainer}>
          <QuestionBox str={questions[currIndex].html_str} />

          {isBuzzerType ? (
            <AnswerBoxGrid answers={questions[currIndex].answers} />
          ) : (
            <QuizInput />
          )}
          <button
            className={styles.nextButton}
            onClick={nextQuestion}
            style={{
              opacity: isQuestionComplete ? 1 : 0,
              visibility: isQuestionComplete ? "visible" : "hidden",
            }}
          >
            Next
          </button>
        </div>
        <img
          src={shapesImg}
          className={styles.shapes}
          style={{ filter: `hue-rotate(${shapeHueRotates[category]})` }}
        />
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
