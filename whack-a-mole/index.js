const holes = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const scoreBoard = document.getElementById("score");
const timer = document.getElementById("timer");
const startButton = document.getElementById("start");
const rules = document.getElementById("rules");

let timeLeft = 20;
timer.textContent = timeLeft;
let score = 0;
scoreBoard.textContent = score;

//Initializing things I use later
let hitPosition;
let timerID = null;
let countDownTimerId = null;
let previousHole;

//Randomize where mole pops up
function randomizeHole() {
  holes.forEach((hole) => {
    hole.classList.remove("mole");
  });

  let randomHole = holes[Math.floor([Math.random() * 9])];

  if (previousHole !== randomHole) {
    randomHole.classList.add("mole");
  } else {
    randomHole = holes[Math.floor([Math.random() * 9])];
    randomHole.classList.add("mole");
  }

  hitPosition = randomHole.id;
  previousHole = randomHole;
}

//Increase score if mole is clicked and change background image
holes.forEach((hole) => {
  hole.addEventListener("click", function () {
    if (hole.id == hitPosition) {
      score++;
      scoreBoard.textContent = score;
      hitPosition = null;
      hole.classList.remove("mole");
      hole.classList.add("bonk");
      setTimeout(() => {
        hole.classList.remove("bonk");
      }, 125);
    }
  });
});

//Start button that resets the game as well
startButton.addEventListener("click", function () {
  clearInterval(countDownTimerId);
  clearInterval(timerID);
  score = 0;
  scoreBoard.textContent = score;
  timeLeft = 20;
  timer.textContent = timeLeft;
  rules.textContent = "Score 15 Points To Win!";
  timerID = setInterval(randomizeHole, 750); //Start randomizing hole
  countDownTimerId = setInterval(countDown, 1000); //Start timer
});

// Decrease timer and end game when timer elapses
function countDown() {
  timeLeft--;
  timer.textContent = timeLeft;

  if (timeLeft == 0) {
    timeLeft = 20;
    clearInterval(timerID);
    clearInterval(countDownTimerId);
    holes.forEach((hole) => {
      hole.classList.remove("mole");
    });
    //Let player know if they won or lost
    if (score >= 15) {
      // alert("You won!!! You scored: " + score);
      rules.textContent = "You won!!! You scored: " + score;
    } else {
      // alert("Game Over! You Scored: " + score);
      rules.textContent = "Game Over! You Scored: " + score;
    }
  }
}
