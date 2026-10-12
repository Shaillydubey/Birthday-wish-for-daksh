
/* 💜 Birthday Surprise JavaScript */

let wishMade = false;

// Show only the requested page
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  const nextScreen = document.getElementById(screenId);

  if (nextScreen) {
    nextScreen.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Page 1 -> Page 2
function startSurprise() {
  showScreen("question1");
  createConfetti(18);
}

// Select an answer on the currently visible question
function selectAnswer(button) {
  const questionBox = button.closest(".question-box");

  questionBox.querySelectorAll(".option").forEach((option) => {
    option.classList.remove("selected");
  });

  button.classList.add("selected");

  const message = button
    .closest(".screen")
    .querySelector(".answer-message");

  if (message) {
    message.textContent = "Cute choice! 💜✨";
  }

  createConfetti(5);
}

// Page 2 -> Page 3
function goToQuestion2() {
  const currentQuestion = document.getElementById("question1");
  const selected = currentQuestion.querySelector(".option.selected");

  if (!selected) {
    currentQuestion.querySelector(".answer-message").textContent =
      "Choose one option first, birthday star! 🌟";
    return;
  }

  showScreen("question2");
}

// Page 3 -> Birthday wish
function showBirthdayWish() {
  const currentQuestion = document.getElementById("question2");
  const selected = currentQuestion.querySelector(".option.selected");

  if (!selected) {
    currentQuestion.querySelector(".answer-message").textContent =
      "Pick one little birthday wish first! 💌";
    return;
  }

  showScreen("birthday");
  createConfetti(65);
}

// Birthday wish button
function makeAWish() {
  const message = document.getElementById("final-message");

  if (wishMade) {
    message.textContent =
      "Keep smiling and have the happiest birthday! 💜🎂";
    return;
  }

  wishMade = true;

  message.textContent =
    "✨ May your little wishes turn into beautiful memories! 💗🎉";

  createConfetti(80);
}

// Colorful confetti
function createConfetti(amount) {
  const container = document.getElementById("confetti-container");
  const colors = ["#c29aff", "#ffacd9", "#a9e5ff", "#ffe58c", "#d9b8ff"];
  const shapes = ["●", "♥", "✦", "★"];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";
    piece.textContent = shapes[Math.floor(Math.random() * shapes.length)];

    piece.style.left = Math.random() * 100 + "vw";
    piece.style.color = colors[Math.floor(Math.random() * colors.length)];
    piece.style.fontSize = 12 + Math.random() * 15 + "px";
    piece.style.animationDuration = 2 + Math.random() * 2.5 + "s";
    piece.style.animationDelay = Math.random() * 0.7 + "s";

    container.appendChild(piece);

    // Remove finished confetti
    piece.addEventListener("animationend", () => {
      piece.remove();
    });
  }
}

// Replay the surprise from the beginning
function replaySurprise() {
  wishMade = false;

  document.querySelectorAll(".option").forEach((option) => {
    option.classList.remove("selected");
  });

  document.querySelectorAll(".answer-message").forEach((message) => {
    message.textContent = "Choose your birthday vibe 💜";
  });

  document.getElementById("final-message").textContent = "";

  document.getElementById("confetti-container").innerHTML = "";

  showScreen("welcome");
}
