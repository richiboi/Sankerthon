import React from "react";
import styles from "./Leaderboard.module.css";

import TopCell from "./TopCell";
import LeaderListItem from "./LeaderListItem";

const playerList = [
  {
    name: "Clarence Cheung",
    points: 32010,
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    pos: 1,
  },
  {
    name: "Theodore Chow",
    points: 29010,
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    pos: 2,
  },
  {
    name: "Shobha Sanker",
    points: 10340,
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    pos: 3,
  },
  {
    name: "Rochelle Kwan",
    points: 8208,
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    pos: 4,
  },
  {
    name: "Marco Chang",
    points: 9010,
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    pos: 5,
  },
  {
    name: "Coleman Yim",
    points: 4211,
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    pos: 6,
  },
];

export default function Leaderboard() {
  console.log(playerList.slice(3));
  return (
    <div className={styles.leaderboardWrapper}>
      <h1>Leaderboard</h1>
      <div className={styles.top3}>
        <TopCell player={playerList[1]} />
        <TopCell player={playerList[0]} />
        <TopCell player={playerList[2]} />
      </div>
      <div className={styles.playerList}>
        {playerList.slice(3).map((player) => {
          return <LeaderListItem player={player} />;
        })}
      </div>
    </div>
  );
}
