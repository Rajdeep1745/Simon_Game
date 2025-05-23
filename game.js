var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
  var random = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[random];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);

  level++;
  $(".heading").text("Level " + level);
}

$(".box").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
});

function playSound(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");

  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 150);
}

var level = 0;
var start = false;
$("body").keypress(function () {
  if (start == false) {
    nextSequence();
    start = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("Success");
    if (currentLevel == gamePattern.length - 1) {
      setTimeout(function () {
        nextSequence();
      }, 1000);

      userClickedPattern = [];
    }
  } else {
    var wrongAudio = new Audio("./sounds/wrong.mp3");
    wrongAudio.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $(".heading").text("Game Over, Press Any Key to Restart");

    startOver();
    console.log("Failure");
  }
}

function startOver() {
  level = 0;
  start = false;
  userClickedPattern = [];
  gamePattern = [];
}
