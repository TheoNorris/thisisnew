import {
  getHighScore,
  postUser,
  displayHighScores,
} from "./modules/backendcalls";

let playerScore = 0;
let computerScore = 0;

let result = {};
const scoreDiv = document.getElementById("score-div");

import paperImage from "./images/paper.jpg";
import rockImage from "./images/rock.jpg";
import scissorsImage from "./images/scissors.jpg";

const form = document.querySelector("form");

form.addEventListener("submit", createGame);

export function createGame(event) {
  event.preventDefault();

  clearScoreDiv();

  const name = document.querySelector("#name").value;
  const container = document.getElementById("container");
  form.reset();
  container.remove();

  const congratsText = document.createElement("h3");
  const gameDiv = document.createElement("div");
  document.body.append(gameDiv);
  gameDiv.className = "game-div";

  const nameH1 = document.createElement("h1");
  gameDiv.appendChild(nameH1);
  nameH1.innerText = `Welcome ${name}!`;

  const descriptionP = document.createElement("p");
  gameDiv.appendChild(descriptionP);
  descriptionP.innerText =
    "These are the rules of the game: You must choose either rock paper or scissors by clicking on the image in an attempt to beat the computer. The first player that wins three times is the winner!";

  const choiceDiv = document.createElement("div");
  gameDiv.appendChild(choiceDiv);
  choiceDiv.className = "choice-div";

  function createplayerDivs(player) {
    const div = document.createElement("div");
    choiceDiv.appendChild(div);
    div.className = "player-div";

    const playerName = document.createElement("h1");
    div.appendChild(playerName);
    playerName.innerText = player;
    const rockPaperDiv = document.createElement("div");
    div.appendChild(rockPaperDiv);
    rockPaperDiv.className = "rockpaper-div";

    return div;
  }

  const playerDiv = createplayerDivs(name);
  const rockPaperDiv = document.createElement("div");
  playerDiv.appendChild(rockPaperDiv);
  const scoreHead = document.createElement("h2");
  playerDiv.appendChild(scoreHead);

  const rockPaperSciss = ["rock", "paper", "scissors"];
  const rpsImages = [rockImage, paperImage, scissorsImage];

  const computerDiv = createplayerDivs("Computer");
  computerDiv.style.width = "40%";
  const computerChoice = document.createElement("img");
  computerChoice.src = rockImage;
  computerDiv.appendChild(computerChoice);
  const scoreHeadComp = document.createElement("h2");
  computerDiv.appendChild(scoreHeadComp);

  const reset = document.createElement("button");
  gameDiv.appendChild(reset);
  reset.innerText = "New Player";
  reset.className = "reset-button";

  reset.addEventListener("click", function () {
    gameDiv.remove();
    document.body.append(container);
    name.value = "";
  });

  for (let i = 0; i < rockPaperSciss.length; i++) {
    const rps = document.createElement("img");
    rockPaperDiv.appendChild(rps);
    rps.src = rpsImages[i];
    rps.style.width = "100px";
    rps.style.height = "100px";
    rps.style.margin = "10px";

    rps.addEventListener("click", function () {
      congratsText.innerText = "";
      const compSelect = Math.floor(Math.random() * rockPaperSciss.length);
      const computerTurn = rockPaperSciss[compSelect];
      computerChoice.src = rpsImages[compSelect];

      if (
        (rockPaperSciss[i] == `rock` && computerTurn == `scissors`) ||
        (rockPaperSciss[i] == `paper` && computerTurn == `rock`) ||
        (rockPaperSciss[i] == `scissors` && computerTurn == `paper`)
      ) {
        playerScore++;
        scoreHead.innerText = `Score: ${playerScore}`;
      } else if (
        (computerTurn == `rock` && rockPaperSciss[i] == `scissors`) ||
        (computerTurn == `paper` && rockPaperSciss[i] == `rock`) ||
        (computerTurn == `scissors` && rockPaperSciss[i] == `paper`)
      ) {
        playerDiv.append(congratsText);
        congratsText.innerText = `Congrats ${name}! You scored ${playerScore}`;
        result = {
          name: name,
          score: playerScore,
        };
        postUser(result).then(() => {
          getHighScore().then(displayHighScores);
        });

        reset();
      } else {
        scoreHead.innerText = playerScore;
        scoreHeadComp.innerText = computerScore;
      }

      function reset() {
        computerScore = 0;
        playerScore = 0;
        scoreHead.innerText = "";
        scoreHeadComp.innerText = "";
        clearScoreDiv();
      }
    });
  }
}

function clearScoreDiv() {
  // Remove all child elements of the "score-div" container
  while (scoreDiv.firstChild) {
    scoreDiv.removeChild(scoreDiv.firstChild);
  }
}

getHighScore().then(displayHighScores);
