
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

var userChosenColour, randomChosenColour;

// Initial Key press
$(document).keypress(function(){

  if(!started){
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
  }
});

// Click for Pattern and getting user clicked function
$(".btn").click(function (){

  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

  if (userClickedPattern.length === gamePattern.length){

    setTimeout(function () {
        nextSequence();
      }, 1000);
  }

  } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {

        $("body").removeClass("game-over");

      }, 200);
      startOver();
  }
}

// Game sequence generation
function nextSequence(){

  userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

 var randomNumber = Math.floor(Math.random()*4); //Generating random number
    randomChosenColour = buttonColours[randomNumber]; //getting random color through random number
    gamePattern.push(randomChosenColour);

 $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // Animation to a random color

 playSound(randomChosenColour); //plays sound when sequence is performed
}

// PlaySound function
function playSound(randomChosenColour){

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3"); // To play a specific colour sound
  audio.play();

}

// Animation for clicked button
function animatePress(currentColour){

  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
