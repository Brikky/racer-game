// //TODO
//fix scrolling issue
// graphics
// sound
//prevent alert stream --> replace with some sort of animation or graphic
// add touch or graphic buttons for mobile and tablet users
// timer
//second player --> use a button to add


window.onload = function() {

    var activeKey = 0;
    var canvas = document.getElementById("spaceField");
    var container = document.getElementById("container");
    var ctx = canvas.getContext("2d");
    var dx = 0;
    var dy = 0;
    var gameOver = false;
    var scrollKeys = {
        37: 1, //left
        38: 1, //up
        39: 1, //right
        40: 1  //down
    };
    var speed = 100; // px per second

    var racer = {
        height: 10,
        width: 15,
        x: 10,
        y: 10,
        color: "#FF0000"
    }
    var goal = {
        height: 15,
        width: 20,
        x: 280,
        y: 65,
        color: "#00FF00"
    }
    var myCanvas = {
        color: "#000000",
        xStart: 0,
        yStart: 0,
        height: 150,
        width: 300
    }

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

    canvas.addEventListener("click", lockGameScreen);

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

    function isLegalMovement() {
        var notLeft = racer.x >= 0 || dx > 0 || dy!= 0;
        var notRight = racer.x <= canvas.width - racer.width || dx < 0 || dy!= 0;
        var notAbove = racer.y >= 0 || dy > 0 || dx != 0;
        var notBelow = racer.y <= canvas.height - racer.height || dy < 0 || dx != 0;

        return notLeft && notRight && notBelow && notAbove;
    }

    function isRacerOverlappingGoal() {
        var xOverlap = racer.x >= goal.x;
        var yOverlap = racer.y >= goal.y && racer.y + racer.height <= goal.y + goal.height;
        return xOverlap && yOverlap;
    }

    function checkWin() {
        if (isRacerOverlappingGoal()) {
            alert("You won!");
        }
    }

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
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;
    }

    function lockGameScreen(){
      disableScroll();
      window.scrollTo(0,document.body.scrollHeight); //bottom of page
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener("DOMMouseScroll", preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

    function race() {
        renderCanvas();

        if (isLegalMovement()) {
            //move racer
            racer.x += dx / 60 * speed;
            racer.y += dy / 60 * speed;
        }

        renderObjects([racer, goal]);

        checkWin();

        requestAnimationFrame(race);
    }

    requestAnimationFrame(race);
}
