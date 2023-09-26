export { getHighScore, postUser, displayHighScores };

let result = {};
const scoreDiv = document.getElementById("score-div");

async function getHighScore() {
  const url = "http://localhost:3008/highscore";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const highScores = await response.json();
    // console.log(highScores);

    return highScores;
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayHighScores(highScoreArray) {
  let postUserCalled = false;

  for (const highscore of highScoreArray) {
    const scoreP = document.createElement("p");
    scoreDiv.append(scoreP);
    scoreP.innerText = `${highscore.name}: ${highscore.score} Points`;

    if (result.score > highscore.score && !postUserCalled) {
      postUser(result);
      postUserCalled = true;
    }
  }
}

async function postUser(player) {
  const url = "http://localhost:3008/highscore";

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(player),
  };

  const response = await fetch(url, options);
  const message = await response.json();

  console.log(message);
}
