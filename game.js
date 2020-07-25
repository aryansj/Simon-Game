var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var state = false;

function nextSequence() {
  level++;
  var newHeading = "Level " + level;
  $("h1").text(newHeading);

  var rand = Math.random()*4;
  rand = Math.floor(rand);
  var randomChosenColor = buttonColors[rand];
  gamePattern.push(randomChosenColor);

  var length = gamePattern.length;
  var currentColorId = "#" + gamePattern[length - 1];
  playSound(gamePattern[length - 1]);
  $(currentColorId).fadeOut().fadeIn();
}

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var currentSound = "sounds/" + name + ".mp3";
  var audio = new Audio(currentSound);
  audio.play();
}

function animatePress(currentColor) {
  var id = "#" + currentColor;
  $(id).addClass("pressed");
  setTimeout(function() {
    $(id).removeClass("pressed");
  }, 100);
}

$(document).keydown(function() {
  if (state === false) {
    state = true;
    setTimeout(nextSequence,1000);
  }
});

function checkAnswer(index) {

  if(userClickedPattern[index] === gamePattern[index]) {
    console.log("success");
  }

  if(userClickedPattern[index] !== gamePattern[index]) {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);

    $("h1").text("Game over , press any key to restart");
    state = false;
    level = 0;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
  }
  if(index === gamePattern.length - 1) {
    userClickedPattern.length = 0;
    setTimeout(nextSequence, 1000);
  }

}
