const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Start the game on keypress
$(document).keypress(() => {
  if (!started) {
    startGameSequence();
    started = true;
  }
});

// Handle button clicks
$(".btn").click(function () {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Check user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        startGameSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#title").text("Sorry! Better Luck Next Time");
    startOver();
  }
}

// Start a new game sequence
function startGameSequence() {
  userClickedPattern = [];
  level++;
  $("#title").text("Your Game Has Started...");
  $("#level-title").text("Level " + level);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Add the "pressed" class and remove it after a delay
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Play audio for the selected color
function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.addEventListener('error', (error) => {
    console.error('Error playing audio:', error);
  });
  audio.play();
}

// Reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
