const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const modalWin = document.querySelector(".modalWin");
const game = document.querySelector(".game");
const restart = document.querySelector(".restart");
const startButton = document.querySelector(".startButton");
const lastScore = document.querySelector(".lastScore");
const recordScore = document.querySelector(".record");
const levelBoard = document.querySelector(".level");
let lastHole;
let timeUp = false;
let score = 0;
let localStoreLastScore = 0;
let record = 0;
let level = 1;

//--------------------

function randomTime() {
  let min;
  let max;
  if (level < 2) {
    min = 300;
    max = 1500;
  } else if (level >= 2) {
    min = 300 - levelBoard.textContent ** 3;
    max = 1500 - levelBoard.textContent ** 4;
  }
  levelBoard.textContent = level;
  if (level >= 6) {
    modalWin.style.visibility = "visible";
    game.style.display = "none";
    console.log(level);
  }
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime();
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) {
      peep();
    }
  }, time);
}

function startGame() {
  localStoreLastScore = score;
  lastScore.textContent = localStoreLastScore;
  scoreBoard.textContent = 0;
  recordScore.textContent = 0;
  score = 0;
  timeUp = false;
  peep();
  setTimeout(() => (timeUp = true), 10000);
  if (record < localStoreLastScore) {
    record = localStoreLastScore;
  }
  recordScore.textContent = record;
  if (localStoreLastScore >= 5) {
    level++;
  }
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = score;
}

function restartGame() {
  level = 1;
  modalWin.style.visibility = "hidden";
  game.style.removeProperty("display");
}
//----------------------
moles.forEach((mole) => mole.addEventListener("click", bonk));
restart.addEventListener("click", restartGame);
startButton.addEventListener("click", startGame);
