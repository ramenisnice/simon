var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// Start the Game
var started = false;
var level = 0;
$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// User Click
$(".btn").click(function() {
  if (started === true) {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1); // input the index of last element in the array
  }
});

// Check Answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    checkFinished();
  } else {
    console.log("wrong");
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function checkFinished() {
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}

// Next Sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// Restart the Game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Sound
function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

// Animation of Clicked Button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
