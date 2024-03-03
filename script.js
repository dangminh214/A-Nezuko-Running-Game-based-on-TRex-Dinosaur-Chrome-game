var isPaused = false;
var character = document.getElementById('character');
var block = document.getElementById("block");
var scoreElement = document.getElementById("score");
var Loose_Warning = document.getElementById("Loose_Warning");
var character = document.getElementById("character");
var gameArea = document.getElementById("game");
var restartBtn = document.getElementById("restartBtn")
var startBtn = document.getElementById("start_btn")
const blockContainer = document.getElementById('blockContainer');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
var pause_warning = document.getElementById("Pause_Warning");

var highscore = 0;
var score = 0;
var isDead = false;
var isJumping = false;
var isStarted = false;
var isFirstJump = true;
var runningTime = 0;
var startTime;

function jump() {
    if (isDead || isJumping || !isStarted || isFirstJump || isPaused) {
        isFirstJump = false;
        setTimeout(3000)
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
        isJumping = false;
    }, 500);
    
}

function scroeIncrement() {
    if (isStarted && !isPaused) {
        score++;
        scoreElement.textContent = "Score: " + score;
    }
}

var scroreCounting = setInterval(scroeIncrement, 500)

function start_game() {
    isStarted = true;
    block.style.animation = "block 1.5s infinite linear";
    startBtn.style.display = "none";
    startTime = Date.now();
    scroreCounting;
}

function checkLose() {
    if(isStarted || !isPaused) {
        var checkDead = setInterval(function() {
            var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
            if (blockLeft <= 20 && blockLeft > 0 && characterTop >= 140) {
                isDead = true;
                block.style.animationPlayState = "paused";
                character.style.animationPlayState = "paused";
                clearInterval(scroreCounting);
                Loose_Warning.textContent =  `Sorry, you have lost the game, your score is: ${score}`
                restartBtn.style.display = "block";
                Loose_Warning.style.display = "block";      
                isStarted = false;
                clearInterval(checkDead)
                checkIfHighScore();
            }
        }, 0)
    }
}
checkDead = setInterval(checkLose,1)

function checkIfHighScore() {
    
}

setInterval(function createBlock() {
    if (isStarted && !isDead && !isPaused) {
        const randomNumber = Math.floor(Math.random() * 3) + 1; 
        if (randomNumber === 1) {
            block.style.width = '25px';
        }
        else if (randomNumber === 3) {
            block.style.width = '90px'
        }   
        document.documentElement.style.setProperty('--number', randomNumber);
    }
}, 1200)

setInterval (function() {
    var currentTime = Date.now();
    runningTime = (currentTime - startTime)/1000;
    console.log(currentTime)
    if (runningTime >= 10) {
        block.style.animation = "block 0.5s infinite linear"
    }
    if (runningTime >= 20) {
        block.style.animation = "block 0.3s infinite linear"
    }
}, 2000)

function restart_game() {
    window.location.reload();
}

function pauseGame() {
    pause_warning.style.display = "block";
    resumeBtn.style.display = "block"  
    block.style.animationPlayState = "paused";
    isPaused = true; 
}

function resumeGame() {
    pause_warning.style.display = "none";
    resumeBtn.style.display ="none";
    block.style.animationPlayState = "running"
    isPaused = false;
 
}