import React, { useContext, useEffect, useState } from "react";
import { QuestionContext } from "./QuestionContext";
import styles from "./../../QuestionScreen.module.css";

export default function Timer() {
  const {
    timeCounter,
    setTimeCounter,
    isQuestionComplete,
    selectAnswer,
    maxTime
  } = useContext(QuestionContext);

  const [strokeDasharray, setStrokeDasharray] = useState("283 283")
  const [ringColor, setRingColor] = useState("#00c900")

  //Timer logic
  useEffect(() => {
    calculateStrokeDasharray();
    changeRingColor();
    if (!isQuestionComplete) {
      const timer =
        !isQuestionComplete &&
        setInterval(() => setTimeCounter(timeCounter - 1), 1000);
      if (timeCounter === 0) {
        console.log("times up");
        selectAnswer(null);
      }
      return () => clearInterval(timer);
    }
  }, [timeCounter, isQuestionComplete]);

  const changeRingColor = () => {
    let timeFrac = timeCounter/maxTime;
    
    if (timeFrac <= 0.2) {
      setRingColor("#ff0000")
    }
    else if (timeFrac <= 0.4) {
      setRingColor("orange")
    }
    else {
      setRingColor("#00c900")
    }
  }

  const calculateStrokeDasharray = () => {
    const strokeLength = 283 * (timeCounter + (timeCounter / maxTime) - 1) / maxTime;
    setStrokeDasharray(`${strokeLength} 283`)
  }

  return (
    <div className={styles.timerBase}>
      <svg
        className={styles.timerBaseSvg}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={styles.timerBaseCircle}>
          <circle
            className={styles.timerBasePathElapsed}
            cx="50"
            cy="50"
            r="45"
          />
          <path
            strokeDasharray={strokeDasharray}
            className={styles.timerBasePathRemaining}
            style={{color: ringColor}}
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span className={styles.timerBaseLabel}>{timeCounter}</span>
    </div>
  );
}
