const choices = document.querySelectorAll(".choice");
const resultText = document.getElementById("result");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const roundSpan = document.getElementById("round");
const replayBtn = document.getElementById("replay");
const playerPickDisplay = document.getElementById("player-pick");
const computerPickDisplay = document.getElementById("computer-pick");

let playerScore = 0;
let computerScore = 0;
let round = 1;

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    if (round > 5) return;

    const playerChoice = choice.dataset.choice;
    const computerChoice = getComputerChoice();

    playerPickDisplay.textContent = getEmoji(playerChoice);
    computerPickDisplay.textContent = getEmoji(computerChoice);

    const winner = getWinner(playerChoice, computerChoice);

    if (winner === "player") {
      playerScore++;
      resultText.textContent = `You win this round! ${capitalize(playerChoice)} beats ${computerChoice}.`;
    } else if (winner === "computer") {
      computerScore++;
      resultText.textContent = `Computer wins this round! ${capitalize(computerChoice)} beats ${playerChoice}.`;
    } else {
      resultText.textContent = `It's a draw! You both chose ${playerChoice}.`;
    }

    updateUI();

    if (round === 5) {
      showFinalResult();
    } else {
      round++;
    }
  });
});

function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

function getWinner(player, computer) {
  if (player === computer) return "draw";

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return "player";
  } else {
    return "computer";
  }
}

function updateUI() {
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
  roundSpan.textContent = round;
}

function showFinalResult() {
  if (playerScore > computerScore) {
    resultText.textContent = "🎉 Congratulations! You Won The Game!";
  } else if (computerScore > playerScore) {
    resultText.textContent = "💻 Game Over! Computer Wins The Game!";
  } else {
    resultText.textContent = "😐 It's a Tie Game! Try Again!";
  }
  replayBtn.style.display = "inline-block";
}

// Emoji helper
function getEmoji(choice) {
  switch (choice) {
    case "rock": return "🪨";
    case "paper": return "📄";
    case "scissors": return "✂️";
    default: return "?";
  }
}

// Capitalize helper
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Reset button
replayBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  round = 1;
  updateUI();
  resultText.textContent = "Make your choice!";
  playerPickDisplay.textContent = "?";
  computerPickDisplay.textContent = "?";
  replayBtn.style.display = "none";
});
