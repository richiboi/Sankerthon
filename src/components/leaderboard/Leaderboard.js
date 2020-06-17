import React, { useState, useEffect } from "react";
import firebase from "./../../firebase";
import styles from "./Leaderboard.module.css";

import TopCell from "./TopCell";
import LeaderListItem from "./LeaderListItem";

const db = firebase.firestore();

export default function Leaderboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [playerList, setPlayerList] = useState(true);

  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = async () => {
    let playerListDoc = await db.doc("/Ranking_info/Leaderboard").get();
    setPlayerList(playerListDoc.data().player_list);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className={styles.leaderboardWrapper}>
        <h1>Leaderboard</h1>
        <p>Loading...</p>
      </div>
    );
  }  else {
    return (
      <div className={styles.leaderboardWrapper}>
        <h1 style = {{marginBottom: "1em"}}>Leaderboard</h1>
        {playerList.length > 3 && (
          <React.Fragment>
            <div className={styles.top3}>
              <TopCell player={playerList[1]} />
              <TopCell player={playerList[0]} />
              <TopCell player={playerList[2]} />
            </div>
            <div className={styles.playerList}>
              {playerList.slice(3).map((player) => {
                return <LeaderListItem player={player} key={player.name}/>;
              })}
            </div>
          </React.Fragment>
        )}
        {playerList.length > 0 && playerList.length <= 3 && (
          <div className={styles.playerList}>
            {playerList.map((player) => {
              return <LeaderListItem player={player} key={player.name} />;
            })}
          </div>
        )}
      </div>
    );
  }
}
