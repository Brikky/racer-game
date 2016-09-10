// //TODO
// graphics
// sound optional
// add touch or graphic buttons for mobile and tablet users
//second player -> use a button to add
//
// *************************************************
// Sections:
// -Objects
// -Variables
// -Event Listeners
// -Rendering Functions (Canvas Graphics)
// -Game Logic Functions
// -Scrolling Functions
// -Run Game
// *************************************************


window.onload = function() {
    //**TESTGROUND**

    //**************

    //Objects
    var bullet11 = {
        height: 5,
        width: 2,
        x: 79,
        y: 100,
        color: "#39ff14"
    }
    var bullet12 = {
        height: 5,
        width: 2,
        x: 154,
        y: 140,
        color: "#39ff14"
    }
    var bullet13 = {
        height: 5,
        width: 2,
        x: 229,
        y: 100,
        color: "#39ff14"
    }
    var bullet21 = {
        height: 5,
        width: 2,
        x: 79,
        y: 30,
        color: "#39ff14"
    }
    var bullet22 = {
        height: 5,
        width: 2,
        x: 154,
        y: 60,
        color: "#39ff14"
    }
    var bullet23 = {
        height: 5,
        width: 2,
        x: 229,
        y: 30,
        color: "#39ff14"
    }
    var goal = {
        height: 15,
        width: 20,
        x: 280,
        y: 65,
        color: "#adff00"
    }
    var myCanvas = {
        xStart: 0,
        yStart: 0,
        height: 150,
        width: 300,
        color: "#000000"
    }
    var shooter1 = {
        height: 5,
        width: 10,
        x: 75,
        y: 145,
        color: "#FFA500"
    }
    var shooter2 = {
        height: 5,
        width: 10,
        x: 150,
        y: 145,
        color: "#FFA500"
    }
    var shooter3 = {
        height: 5,
        width: 10,
        x: 225,
        y: 145,
        color: "#FFA500"
    }
    var racer = {
        height: 10,
        width: 15,
        x: 10,
        y: 10,
        color: "#FF0000"
    }

    //Variables
    var activeKey = 0;
    var hostileGamePieces = [shooter1, shooter2, shooter3, bullet11, bullet12, bullet13, bullet21, bullet22, bullet23];
    var bullets = [bullet11, bullet12, bullet13, bullet21, bullet22, bullet23];
    var bulletSound = new Audio("sounds/blaster-firing.mp3");
    bulletSound.loop = false;
    var canvas = document.getElementById("spaceField");
    var container = document.getElementById("container");
    var ctx = canvas.getContext("2d");
    var dx = 0;
    var dy = 0;
    var explosion = document.createElement("VIDEO");
    explosion.src = "video/death star explosion.mp4";
    var gamePieces = [racer, goal, shooter1, shooter2, shooter3, bullet11, bullet12, bullet13, bullet21, bullet22, bullet23];
    var header = document.getElementById("page-header");
    var instructions = document.getElementById("instructions");
    var playAgain = document.createElement("BUTTON");
    playAgain.textContent = "Play Again";
    playAgain.addEventListener("click", window.location.reload.bind(window.location));
    var scrollKeys = {
        37: 1, //left
        38: 1, //up
        39: 1, //right
        40: 1 //down
    };
    var shooters = [shooter1, shooter2, shooter3];
    var speed = 100; // px per second
    var themeSong = new Audio("sounds/theme.mp3");
    themeSong.loop = false;
    var vaderBreathing = new Audio("sounds/vaderbreathing.mp3");
    vaderBreathing.loop = true;
    var vaderImage = document.createElement("IMG");
    vaderImage.setAttribute("src", "/images/vader.jpg");




    //Event Listeners
    canvas.addEventListener("click", lockGameScreen);

    document.addEventListener("keydown", function(e) {
        if (activeKey == e.keyCode) return;
        activeKey = e.keyCode;
        switch (e.keyCode) {
            case 37:
                dx = -1;
                break;
            case 38:
                dy = -1;
                break;
            case 39:
                dx = 1;
                break;
            case 40:
                dy = 1;
                break;
        }
    });

    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37: // left
            case 39: // right
                dx = 0;
                break;
            case 38: // up
            case 40: // down
                dy = 0;
                break;
        }
        activeKey = 0;
    });

    //Rendering Functions
    function remove(id) {
        return (elem = document.getElementById(id)).parentNode.removeChild(elem);
    }

    function renderCanvas() {
        ctx.fillStyle = myCanvas.color;
        ctx.fillRect(myCanvas.xStart, myCanvas.yStart, myCanvas.width, myCanvas.height);
    }

    function renderObject(object) {
        ctx.fillStyle = object.color;
        ctx.fillRect(object.x, object.y, object.width, object.height);
    }

    function renderObjects(objectArray) {
        for (var i = 0; i < objectArray.length; i++) {
            renderObject(objectArray[i]);
        }
    }

    //Game Logic Functions
    function isLegalXMovement() {
        var notLeft = racer.x >= 0 || dx > 0;
        var notRight = racer.x <= canvas.width - racer.width || dx < 0;
        return notLeft && notRight;
    }

    function isLegalYMovement() {
        var notAbove = racer.y >= 0 || dy > 0;
        var notBelow = racer.y <= canvas.height - racer.height || dy < 0;
        return notBelow && notAbove;
    }

    function isOverlapping(object1, object2) {
        return !(object1.x + object1.width < object2.x || object2.x + object2.width < object1.x || object1.y + object1.height < object2.y || object2.y + object2.height < object1.y);

    }

    function moveBullets() {
        bulletSound.play();
        for (var i = 0; i < bullets.length; i++) {
            if (bullets[i].y == 0) {
                bullets[i].y = 140;
            }
            bullets[i].y -= 1;
        }
    }

    function checkCollision(checkObject, againstArray) {
        for (var i = 0; i < againstArray.length; i++) {
            if (isOverlapping(checkObject, againstArray[i])) {
                return true;
            }
        }
    }

    function handleCollision() {
        header.textContent = "You've been destroyed!";
        instructions.remove();
        canvas.remove();
        container.appendChild(vaderImage);
        container.appendChild(playAgain);
        vaderBreathing.play();
        bulletSound = 0;
    }

    function checkWin() {
        return isOverlapping(racer, goal)
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
    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
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
        if (isLegalXMovement()) {
            racer.x += dx / 60 * speed;
        }
        if (isLegalYMovement()) {
            racer.y += dy / 60 * speed;
        }
        moveBullets();
        renderObjects(gamePieces);

        if (checkCollision(racer, hostileGamePieces)) {
            handleCollision();
        }

        if (checkWin()) {
            handleWin();
        }

        requestAnimationFrame(race);
    }

    requestAnimationFrame(race);


}
