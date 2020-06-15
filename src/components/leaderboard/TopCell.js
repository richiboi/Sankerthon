import React from 'react'
import styles from "./Leaderboard.module.css";

export default function TopCell({player}) {

  const {image, name, points, pos} = player;

  console.log()
  console.log(styles.top3)
  return (
    <div className={`${styles.topItem} ${pos==1? styles.top1 : ''}`}>
      <h1 className={styles.topPos}>{pos}</h1>
      <img src={image} className={styles.topImage}/>
      <h2 className={styles.topName}>{name}</h2>
      <h4 className={styles.topPoints}>{points}</h4>
    </div>
  )
}
