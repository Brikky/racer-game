// //TODO
// graphics
// sound
// add touch or graphic buttons for mobile and tablet users
// timer
//second player --> use a button to add
//play again button
//shooters shoot stuff
//
// *************************************************
// Sections:
// -Variables
// -Objects
// -Event Listeners
// -Rendering Functions (Canvas Graphics)
// -Game Logic Functions
// -Scrolling Functions
// -Run Game
// *************************************************


window.onload = function() {

    //Variables
    var activeKey = 0;
    var canvas = document.getElementById("spaceField");
    var ctx = canvas.getContext("2d");
    var dx = 0;
    var dy = 0;
    var header = document.getElementById("page-header");
    var instructions = document.getElementById("instructions");
    var scrollKeys = {
        37: 1, //left
        38: 1, //up
        39: 1, //right
        40: 1 //down
    };
    var speed = 100; // px per second

    //**TESTGROUND**
    //**************

    //Objects
    var goal = {
        height: 15,
        width: 20,
        x: 280,
        y: 65,
        color: "#00FF00"
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
    var shooters = [shooter1, shooter2, shooter3];
    var racer = {
        height: 10,
        width: 15,
        x: 10,
        y: 10,
        color: "#FF0000"
    }

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
        var xOverlap = object1.x + object1.width >= object2.x && object2.x + object2.width >= object1.x;
        var yOverlap = object1.y >= object2.y && object1.y + object1.height <= object2.y + object2.height;

        return xOverlap && yOverlap;
    }

    function checkCollision(checkObject, againstArray) {
        for (var i = 0; i < againstArray.length; i++) {
            return isOverlapping(checkObject, againstArray[i]);
        }
    }

    function checkWin() {
        if (isOverlapping(racer, goal)) {
            instructions.textContent = "";
            header.textContent = "You destroyed the Death Star!";
        }
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

        if (checkCollision(racer, shooters)) {
            console.log("collision");
        }

        //move racer
        if (isLegalXMovement()) {
            racer.x += dx / 60 * speed;
        }
        if (isLegalYMovement()) {
            racer.y += dy / 60 * speed;
        }

        renderObjects([racer, goal, shooter1, shooter2, shooter3]);

        checkWin();

        requestAnimationFrame(race);
    }

    requestAnimationFrame(race);
}
