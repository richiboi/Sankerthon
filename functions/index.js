const functions = require("firebase-functions");
const _ = require("lodash");

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.onNewUserAuth = functions.auth.user().onCreate(async (user) => {
  // //Check if RCHK Email address
  // if (/@rchk.edu.hk/.test(user.email)) {
  //   return onNewUserAuth(user.uid, user.email, user.displayName, user.photoURL);
  // }
  // console.log('not rchk email')
  // return null;

  return onNewUserAuth(user.uid, user.email, user.displayName, user.photoURL);
});

const onNewUserAuth = async (uid, email, displayName, photoURL) => {
  db.doc(`/Users/${uid}`).set({
    email,
    username: uid,
    display_name: displayName,
    photo_url: photoURL,
    category_scores: { buzzer: null, quiz: null, ooo: null },
    total_score: null,
  });
};

// Cloud Function call on write to user ->
// check if score changed, update totalscore if needed, then update leaderboard
// Else do nothing
exports.onUserDocWrite = functions.firestore
  .document("Users/{userId}")
  .onUpdate((change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const { userId } = context.params;

    const categoryScoresList = Object.values(after.category_scores);

    if (
      !categoryScoresList.includes(null) &&
      !_.isEqual(before.category_scores, after.category_scores)
    ) {
      //Total score can be updated
      console.log("if statement passed");
      return writeTotalScore(userId, after);
    }

    return null;
  });

const writeTotalScore = async (userId, userData) => {
  console.log("writetotalscore called");
  const totalScore = Object.values(userData.category_scores).reduce(
    (acc, curr) => {
      return acc + curr;
    }
  );
  console.log("Total score is ", totalScore);

  await db.doc(`/Users/${userId}`).update({ total_score: totalScore });

  await writeToLeaderboard(userData, userId, totalScore);
};

const writeToLeaderboard = async (userData, userId, totalScore) => {
  console.log("writetoleaderboard called");
  const leaderboardRef = db.doc("/Ranking_info/Leaderboard");
  const leaderboardListDoc = await leaderboardRef.get();
  let playerList = await leaderboardListDoc.data().player_list;

  let userLeaderboardData = {
    image: userData.photo_url,
    name: userData.display_name,
    points: totalScore,
    pos: null,
    uid: userId,
  };

  //Check if it doesn't exist in player list
  let exists = false;
  playerList.forEach((player) => {
    if (player.uid === userLeaderboardData.uid) {
      exists = true;

      console.log(
        "player already exists. Update functionality not implemented"
      );
    }
  });

  if (!exists) {
    playerList = insertIntoPointsSorted(playerList, userLeaderboardData);
  }

  await leaderboardRef.set({ player_list: playerList });
  console.log("Finished write to leaderboard");
};

const insertIntoPointsSorted = (arr, user) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].points < user.points) {
      return reorganizePos([...arr.slice(0, i), user, ...arr.slice(i)]);
    }
  }
  return reorganizePos([...arr, user]);
};

const reorganizePos = (list) => {
  for (let i = 0; i < list.length; i++) {
    list[i].pos = i + 1;
  }
  return list;
};
