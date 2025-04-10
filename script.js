var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$("#play").click(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $("#play").hide();
    }
});

$(".btn").click(function() {
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);

        playsound(userChosenColor);
        animatePress(userChosenColor);      

        checkAnswer(userClickedPattern.length - 1);
});

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

    $(".btn").on("click touchstart", function () {
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playsound(userChosenColor);
        animatePress(userChosenColor);      
        checkAnswer(userClickedPattern.length - 1);
    });
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {

            $(".btn").off("click touchstart");

            setTimeout(function() {
                nextSequence();

                $(".btn").on("click touchstart", function () {
                    var userChosenColor = this.id;
                    userClickedPattern.push(userChosenColor);
                    playsound(userChosenColor);
                    animatePress(userChosenColor);      
                    checkAnswer(userClickedPattern.length - 1);
                });

            }, 1000);
        }
    }

    else {
        
        $(".btn").off("click touchstart");

        playsound("wrong");
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game over!");

        $("#play").show();
        $(".h1").text("Retry"); 
        startOver();
    }

}

function nextSequence() {

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];
    

    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosenColor);

    level++;

    $("#level-title").text("Level " + level);

    userClickedPattern = [];

    
    
}

function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 110);

}