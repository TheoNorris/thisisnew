const express = require("express");

const fs = require("fs");

const app = express();

app.use(express.json()); // manage data in json
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/highscore", (req, res) => {
  console.log("Get request received at /highscore");

  const rawHighscore = fs.readFileSync("./data/highscore.json");
  const highScoreArray = JSON.parse(rawHighscore);
  console.log(highScoreArray);

  res.send(highScoreArray);
});

app.post("/highscore", (req, res) => {
  const newPlayerScore = req.body;

  const rawPlayerScores = fs.readFileSync("./data/highscore.json");
  const playerScores = JSON.parse(rawPlayerScores);
  playerScores.push(newPlayerScore);

  playerScores.sort((a, b) => b.score - a.score);

  const MAX_SCORES = 5;
  playerScores.splice(MAX_SCORES);

  fs.writeFileSync("./data/highscore.json", JSON.stringify(playerScores));

  res.send({ message: "Added new user" });
});

app.listen(3008, () => {
  console.log("listening on port 3008...");
});
