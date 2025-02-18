let rand = Math.floor(Math.random() * 100) + 1;
let score = 100;
let chances = 10;
let bgMusic = new Audio("sounds/bg-music.mp3");
let victoryMusic = new Audio("sounds/victory.mp3");
let sound1 = new Audio("sounds/sound1.mp3");
let sound2 = new Audio("sounds/sound2.mp3");
let gameoverSound = new Audio("sounds/gameover.mp3");
let wrongSound = new Audio("sounds/wrong.mp3");

document.getElementById("guessButton").addEventListener("click", () => {
  if (chances === 0 || score === 0) {
    triggerBuzzer();
    return;
  }
  playSound1();
  bgMusic.volume = 0.5;
  checkGuess();
});

document.getElementById("reset").addEventListener("click", () => {
  playSound2();
  resetGame();
  bgMusic.play();
  document.getElementById("guessButton").disabled = false;
});

function playSound1() {
  sound1.currentTime = 0;
  sound1.play();
}

function playSound2() {
  sound2.currentTime = 0;
  sound2.play();
}

function checkGuess() {
  let guess = Number(document.getElementById("userGuess").value);
  let message = document.getElementById("message");

  if (guess < 1 || guess > 100 || isNaN(guess)) {
    wrongSound.play();
    message.textContent = "Number Limit Exceeded! Enter number (1-100)";
    document.getElementById("userGuess").value = "";
    return;
  }

  if (chances > 0) {
    chances--;
  }
  document.getElementById("chances").textContent = chances;

  if (guess === rand) {
    score = 100;
    chances = 10;
    document.getElementById("userGuess").value = "";
    message.textContent = "GREAT! NOW GUESS NEXT";
    document.getElementById("score").textContent = score;
    document.getElementById("chances").textContent = chances;
    rand = Math.floor(Math.random() * 100) + 1;

    victoryMusic.currentTime = 0;
    victoryMusic.play();

    victoryMusic.onended = function () {
      setTimeout(() => {
        fadeOut(bgMusic, 2000);
      }, 2000);
    };
    return;
  } else if (guess < rand) {
    message.textContent = "HINT: NUMBER IS LOW";
    document.getElementById("userGuess").value = "";
  } else {
    message.textContent = "HINT: NUMBER IS HIGH";
    document.getElementById("userGuess").value = "";
  }

  if (score > 0) {
    score -= 10;
  }
  document.getElementById("score").textContent = score;

  if (chances === 0 && rand !== guess) {
    message.textContent = "CORRECT NUMBER WAS " + rand;
    gameoverSound.play();

    gameoverSound.onended = function () {
      setTimeout(() => {
        fadeIn(bgMusic, 2000);
      }, 2000);
    };

    document.getElementById("guessButton").addEventListener(
      "click"(() => {
        triggerBuzzer();
      })
    );
    document.getElementById("guessButton").disabled = true;
    return;
  }
}

function resetGame() {
  rand = Math.floor(Math.random() * 100) + 1;
  score = 100;
  chances = 10;
  document.getElementById("chances").textContent = chances;
  document.getElementById("score").textContent = score;
  document.getElementById("userGuess").value = "";
  document.getElementById("message").textContent = "";
  bgMusic.currentTime = 0;
  document.getElementById("guessButton").disabled = false;
}

function fadeIn(audio, duration) {
  audio.play();
  let volume = 0;
  audio.volume = volume;

  let fadeInInterval = setInterval(() => {
    volume += 0.05;
    if (volume >= 1) {
      volume = 1;
      clearInterval(fadeInInterval);
    }
    audio.volume = volume;
  }, duration / 20);
}

function fadeOut(audio, duration) {
  let volume = audio.volume;
  let fadeOutInterval = setInterval(() => {
    volume -= 0.05;
    if (volume <= 0) {
      volume = 0;
      clearInterval(fadeOutInterval);
      audio.pause();
    }
    audio.volume = volume;
  }, duration / 20);
}

function triggerBuzzer() {
  let guessButton = document.getElementById("reset");

  guessButton.classList.add("buzzer-shake");

  setTimeout(() => {
    guessButton.classList.remove("buzzer-shake");
  }, 1000);
}

document.getElementById("ON").addEventListener("click", () => {
  bgMusic.loop = true;
  bgMusic.play();
});
document.getElementById("OFF").addEventListener("click", () => {
  bgMusic.loop = false;
  bgMusic.pause();
});

const buttons = document.querySelectorAll(".transform-button");

buttons.forEach((button) => {
  button.addEventListener("touchstart", () => {
    button.classList.add("active");
  });

  button.addEventListener("touchend", () => {
    button.classList.remove("active");
  });

  button.addEventListener("click", () => {
    button.classList.remove("active");
  });
});
const popup = document.getElementById("popup");
const start = document.getElementById("start");
start.addEventListener("click", () => {
  popup.style.visibility = "hidden";
  document.querySelector(".container").style.display = "inline-block";
  document.querySelector(".container").style.alignContent = "center";
  document.querySelector(".container").style.alignItems = "center";
  document.querySelector(".container").style.marginTop = "500px";
});
document.getElementById("start").addEventListener("click", () => {
  bgMusic.loop = true;
  bgMusic.play();
});
document.getElementById("ON").checked = true;
