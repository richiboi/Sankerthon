import React from "react";
import styles from "./Leaderboard.module.css";

export default function LeaderListItem({ player }) {
  const { image, name, points, pos} = player;

  return (
    <div className={styles.listItem}>
      <h1 className={styles.listPos}>{pos}</h1>
      <img src={image} className={styles.listImage} />
      <h2 className={styles.listName}>{name}</h2>
      <h4 className={styles.listPoints}>{points}</h4>
    </div>
  );
}
