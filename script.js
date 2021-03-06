// //Further Work
// add touch or graphic buttons for mobile and tablet users
//upupdowndownleftrightAB
//
// *************************************************
// Sections:
// -Objects
// -Variables
// -Event Listeners
// -Rendering Functions (Canvas Graphics/Layout)
// -Game Logic Functions
// -Scrolling Functions
// -Run Game
// *************************************************

window.onload = function() {
    //**TESTGROUND**

    //**************

    //Objects
    var shooter1 = {
      image: tieFighterImage,
        height: 5,
        width: 10,
        x: 75,
        y: 145,
        color: "rgba(0,0,0,0)"
    };
    var shooter2 = {
      image: tieFighterImage,
        height: 5,
        width: 10,
        x: 150,
        y: 145,
        color: "rgba(0,0,0,0)"
    };
    var shooter3 = {
      image: tieFighterImage,
        height: 5,
        width: 10,
        x: 225,
        y: 145,
        color: "rgba(0,0,0,0)"
    };
    var bullet11 = {
        height: 5,
        width: 2,
        x: shooter1.x + shooter1.width / 2 - 1,
        y: 100,
        color: "#39ff14"
    };
    var bullet12 = {
        height: 5,
        width: 2,
        x: shooter2.x + shooter2.width / 2 - 1,
        y: 140,
        color: "#39ff14"
    };
    var bullet13 = {
        height: 5,
        width: 2,
        x: shooter3.x + shooter3.width / 2 - 1,
        y: 100,
        color: "#39ff14"
    };
    var bullet21 = {
        height: 5,
        width: 2,
        x: shooter1.x + shooter1.width / 2 - 1,
        y: 30,
        color: "#39ff14"
    };
    var bullet22 = {
        height: 5,
        width: 2,
        x: shooter2.x + shooter2.width / 2 - 1,
        y: 60,
        color: "#39ff14"
    };
    var bullet23 = {
        height: 5,
        width: 2,
        x: shooter3.x + shooter3.width / 2 - 1,
        y: 30,
        color: "#39ff14"
    };
    var goal = {
      image: deathStarImage,
        height: 25,
        width: 25,
        x: 280,
        y: 65,
        color: "rgba(0,0,0,0)"
    };
    var myCanvas = {
        xStart: 0,
        yStart: 0,
        height: 150,
        width: 300,
        color: "#000000"
    };
    var racer = {
      image: shipImage,
        height: 10,
        width: 15,
        x: 10,
        y: 40,
        color: "rgba(0,0,0,0)",
        dx: 0,
        dy: 0
    };
    var racer2 = {
      image: shipImage2,
        height: 10,
        width: 15,
        x: 10,
        y: 100,
        color: "rgba(0,0,0,0)",
        dx: 0,
        dy: 0
    };

    //Variables
    var activeKey = 0;
    var bullets = [bullet11, bullet12, bullet13, bullet21, bullet22, bullet23];
    var bulletSound = new Audio("sounds/blaster-firing.mp3");
    bulletSound.loop = false;
    var canvas = document.getElementById("spaceField");
    var container = document.getElementById("container");
    var context = canvas.getContext("2d");
    var deathStarImage = new Image();
    deathStarImage.src = "images/death-star.png";
    var explosion = document.createElement("VIDEO");
    explosion.src = "video/death star explosion.mp4";
    var gamePieces = [racer, goal, shooter1, shooter2, shooter3, bullet11, bullet12, bullet13, bullet21, bullet22, bullet23];
    var header = document.getElementById("page-header");
    var hostileGamePieces = [shooter1, shooter2, shooter3, bullet11, bullet12, bullet13, bullet21, bullet22, bullet23];
    var imagePieces = [racer, shooter1, shooter2, shooter3, goal];
    var instructions = document.getElementById("instructions");
    var playAgain = document.createElement("BUTTON");
    playAgain.textContent = "Play Again";
    var playerOneDead = false;
    var playerTwoActive = false;
    var playerTwoButton = document.getElementById("player-toggle");
    var playerTwoControls = document.createElement("H4");
    playerTwoControls.textContent = "Player 2 Use WASD as arrow keys.";
    var playerTwoDead = false;
    var scrollKeys = {
        37: 1, //left
        38: 1, //up
        39: 1, //right
        40: 1, //down
        65: 1, //A -> Player 2 left
        87: 1, //W -> Player 2 up
        68: 1, //D -> Player 2 right
        83: 1 // S -> Player 2 down
    };
    var shipImage = new Image();
    shipImage.src = "images/ship.png";
    var shipImage2 = new Image();
    shipImage2.src = "images/ship2.png";
    var shooters = [shooter1, shooter2, shooter3];
    var speed = 100; // px per second
    var soundButton = document.getElementById("sound-toggle");
    var soundOn = true;
    var startButton = document.getElementById("start");
    var themeSong = new Audio("sounds/theme.mp3");
    var tieFighterImage = new Image();
    tieFighterImage.src = "images/tie-fighter.png";
    themeSong.loop = false;
    var vaderBreathing = new Audio("sounds/vaderbreathing.mp3");
    vaderBreathing.loop = true;
    var vaderImage = document.createElement("IMG");
    vaderImage.src = "images/vader.jpg";

    //Event Listeners
    canvas.addEventListener("click", lockGameScreen);
    playAgain.addEventListener("click", window.location.reload.bind(window.location));
    soundButton.addEventListener("click", toggleSound);
    playerTwoButton.addEventListener("click", addPlayerTwo);
    startButton.addEventListener("click", startGame)

    document.addEventListener("keydown", function(e) {
        if (activeKey == e.keyCode) return;
        activeKey = e.keyCode;
        switch (e.keyCode) {
            case 37:
                racer.dx += -1;
                break;
            case 38:
                racer.dy += -1;
                break;
            case 39:
                racer.dx += 1;
                break;
            case 40:
                racer.dy += 1;
                break;
            case 65:
                racer2.dx += -1;
                break;
            case 87:
                racer2.dy += -1;
                break;
            case 68:
                racer2.dx += 1;
                break;
            case 83:
                racer2.dy += 1;
                break;
        }
    });

    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37: //left
            case 39: //right
                racer.dx = 0;
                break;
            case 38: //up
            case 40: //down
                racer.dy = 0;
                break;
            case 65: //p2 left
            case 68: //p2 right
                racer2.dx = 0;
                break;
            case 87: //p2 up
            case 83: //p2 down
                racer2.dy = 0;
                break;
        }
        activeKey = 0;
    });

    //Rendering Functions

    function startGame() {
        requestAnimationFrame(race);
        startButton.remove();
        lockGameScreen();
    }

    function remove(id) {
        return (elem = document.getElementById(id)).parentNode.removeChild(elem);
    }

    function renderCanvas() {
        context.fillStyle = myCanvas.color;
        context.fillRect(myCanvas.xStart, myCanvas.yStart, myCanvas.width, myCanvas.height);
    }

    function renderObject(object) {
        context.fillStyle = object.color;
        context.fillRect(object.x, object.y, object.width, object.height);
    }

    function renderObjects(objectArray) {
        objectArray.forEach(function(object) {
            renderObject(object);
        });
    }


    function drawImages(gamePieces) {
        gamePieces.forEach(function(piece) {
            context.drawImage(piece.image, piece.x, piece.y, piece.width, piece.height);
        });
    }

    function addPlayerTwo() {
        playerTwoActive = !playerTwoActive;
        if (playerTwoActive) {
            gamePieces.push(racer2);
            instructions.appendChild(playerTwoControls);
        } else if (gamePieces[gamePieces.length - 1] == racer2) {
            gamePieces.pop();
            playerTwoControls.remove();
        }
    }

    function drawPlayerTwo() {
        context.drawImage(shipImage2, racer2.x, racer2.y, 17, 12);
    }

    //Game Logic Functions
    function isLegalXMovement(racerObject) {
        var notLeft = racerObject.x >= 0 || racerObject.dx > 0;
        var notRight = racerObject.x <= canvas.width - racerObject.width || racerObject.dx < 0;
        return notLeft && notRight;
    }

    function isLegalYMovement(racerObject) {
        var notAbove = racerObject.y >= 0 || racerObject.dy > 0;
        var notBelow = racerObject.y <= canvas.height - racerObject.height || racerObject.dy < 0;
        return notBelow && notAbove;
    }

    function isOverlapping(object1, object2) {
        return !(object1.x + object1.width < object2.x ||
            object2.x + object2.width < object1.x ||
            object1.y + object1.height < object2.y ||
            object2.y + object2.height < object1.y);
    }

    function toggleSound() {
        soundOn = !soundOn;
    }

    function moveBullets() {
        if (soundOn) {
            bulletSound.play();
        }
        bullets.forEach(function(bullet, index) {
            if (bullet.y <= 0) {
                bullet.y = 140;
                switch (index) {
                    case 0:
                    case 3:
                        bullet.x = shooter1.x + shooter1.width / 2 - 1;
                        break;
                    case 1:
                    case 4:
                        bullet.x = shooter2.x + shooter2.width / 2 - 1;
                        break;
                    case 2:
                    case 5:
                        bullet.x = shooter3.x + shooter3.width / 2 - 1;
                        break;
                }
            }

            if (racer.x >= 75 || racer2.x >= 75 && racer.x < 150 && racer2.x < 150) {
                bullet.y -= 2;
            } else if (racer.x >= 150 || racer2.x >= 150) {
                bullet.y -= 3.5;
            } else {
                bullet.y -= 1;
            }
        })
    }

    function moveShooters() {
        //TIE fighters should preferentialy target player1
        if (racer.x < 75) {
            racer.x - shooter1.x <= 0 ? shooter1.x -= 0.2 : shooter1.x += 0.2;
        } else if (playerTwoActive && racer2.x < 75) {
            racer2.x - shooter1.x <= 0 ? shooter1.x -= 0.2 : shooter1.x += 0.2;
        } else if (racer.x >= 75 && racer.x <= 150) {
            racer.x - shooter2.x <= -10 ? shooter2.x -= 0.35 : shooter2.x += 0.35;
        } else if (playerTwoActive && racer2.x >= 75 && racer2.x <= 150) {
            racer2.x - shooter2.x <= -10 ? shooter2.x -= 0.35 : shooter2.x += 0.35;
        } else if (racer.x > 150 && racer.x < 300) {
            racer.x - shooter3.x <= -20 ? shooter3.x -= 0.5 : shooter3.x += 0.5;
        } else if (playerTwoActive && racer2.x > 150 && racer2.x < 300) {
            racer2.x - shooter3.x <= -20 ? shooter3.x -= 0.5 : shooter3.x += 0.5;
        }
    }

    function checkCollision(checkObject, againstArray) {
        for (var i = 0; i < againstArray.length; i++) {
            if (isOverlapping(checkObject, againstArray[i])) {
                return true;
            }
        }
    }

    function loseGame() {
        header.textContent = "You've been destroyed!";
        instructions.remove();
        canvas.remove();
        container.appendChild(vaderImage);
        container.appendChild(playAgain);
        vaderBreathing.play();
        bulletSound = 0;
    }

    function checkWin() {
        return isOverlapping(racer, goal) || isOverlapping(racer2, goal);
    }

    function handleWin() {
        instructions.textContent = "";
        header.textContent = "You destroyed the Death Star!";
        canvas.remove();
        themeSong.play();
        container.appendChild(explosion);
        container.appendChild(playAgain);
        explosion.play();
        bulletSound = 0;
    }

    //Scrolling functions
    function preventDefault(event) {
        event = event || window.event;
        if (event.preventDefault)
            event.preventDefault();
        event.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (scrollKeys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener("DOMMouseScroll", preventDefault, false);
        document.onkeydown = preventDefaultForScrollKeys;
        //only prevents keys, not wheel or touch
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener("DOMMouseScroll", preventDefault, false);
        document.onkeydown = null;
    }

    function lockGameScreen() {
        disableScroll();
        window.scrollTo(0, document.body.scrollHeight); //bottom of page
    }

    //Run Game
    function race() {
        renderCanvas();

        //move racer
        if (isLegalXMovement(racer)) {
            racer.x += racer.dx / 60 * speed;
        }
        if (isLegalYMovement(racer)) {
            racer.y += racer.dy / 60 * speed;
        }

        if (playerTwoActive) {
            drawPlayerTwo();

            //move racer2
            if (isLegalXMovement(racer2)) {
                racer2.x += racer2.dx / 60 * speed;
            }
            if (isLegalYMovement(racer2)) {
                racer2.y += racer2.dy / 60 * speed;
            }
            if (isOverlapping(racer, racer2)) {
                loseGame();
            }
            if (checkCollision(racer, hostileGamePieces)) {
                instructions.innerHTML = "<h4>Player one destroyed!</h4>";
                playerOneDead = true;
                racer.x = 400; //places player offscreen to the right
                racer.y = -100; // places player offscreen above screen

            }

            if (checkCollision(racer2, hostileGamePieces)) {
                instructions.innerHTML = "<h4>Player two destroyed!</h4>";
                playerTwoDead = true;
                racer2.x = 2000; //places player offscreen to the right
                racer2.y = -100; //playes player offscreen above screen

            }

            if (playerOneDead && playerTwoDead) {
                loseGame();
            }
        }

        moveBullets();
        moveShooters();
        renderObjects(gamePieces);

        context.drawImage(shipImage, racer.x, racer.y, 17, 12);
        context.drawImage(tieFighterImage, shooter1.x, 145, 10, 5);
        context.drawImage(tieFighterImage, shooter2.x, 145, 10, 5);
        context.drawImage(tieFighterImage, shooter3.x, 145, 10, 5);
        context.drawImage(deathStarImage, 275, 65, 25, 25);

        if (!playerTwoActive && checkCollision(racer, hostileGamePieces)) {
            loseGame();
        }

        if (checkWin()) {
            handleWin();
        }

        requestAnimationFrame(race);
    }

}
