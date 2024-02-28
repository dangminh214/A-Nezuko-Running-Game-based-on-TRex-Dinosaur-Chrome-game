var character = document.getElementById('character');
var block = document.getElementById("block");
var scoreElement = document.getElementById("score");
var Loose_Warning = document.getElementById("Loose_Warning");
var character = document.getElementById("character");
var gameArea = document.getElementById("game");
var restartBtn = document.getElementById("restartBtn")

var score = 0
var isDead = false;
var isJumping = false;
function jump() {
    if (isDead || isJumping) {
        return;
    }
    // Set isJumping flag to true to prevent multiple jumps
    isJumping = true;
    // Add the 'animate' class to start the jump animation
    character.classList.add("animate");
    // Move the character up smoothly
    character.style.transition = 'transform 0.25s ease-out';
    character.style.transform = 'translateY(-80px)';

    // After a short delay, bring the character back down
    setTimeout(function() {
        character.style.transition = 'transform 0.25s ease-in';
        character.style.transform = 'translateY(0)';
    }, 250);

    // Reset the 'animate' class and isJumping flag after the animation finishes
    setTimeout(function() {
        character.classList.remove("animate");
    }, 500);
    isJumping = false;
}
/*
function createBlock() {
    var gameArea = document.getElementById("game");
    
    // Create a new block element
    var block = document.createElement("div");
    block.setAttribute("id","block");
    
    // Generate a random width between 20px and 60px
    var randomWidth = Math.floor(Math.random() * (60 - 20 + 1)) + 20;
    
    // Set the random width for the block element
    block.style.width = randomWidth + "px";
    
    // Add the block to the game area
    gameArea.appendChild(block);
}
*/
var checkDead = setInterval(function() {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    restartBtn.style.display = "none";
    if (blockLeft <= 20 && blockLeft > 0 && characterTop >= 140) {
        isDead = true;
        block.style.animationPlayState = "paused";
        character.style.animationPlayState = "paused";
        clearInterval(scoreIncrease);
        clearInterval(checkDead);
        Loose_Warning.textContent =  `Sorry, you have lost the game, your score is: ${score}`
        Loose_Warning.style.display = "block";
        if (Loose_Warning.style.display === "block") {
            restartBtn.style.display = "block";
        }
    }
}, 0)

function startGame () {
    
}

var scoreIncrease = setInterval(function() {
    score++;
    scoreElement.textContent = "Score: " + score;
}, 500)


function restart_game() {
    window.location.reload();
}

//var buildBlock = setInterval(createBlock(), 1);