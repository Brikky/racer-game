window.onload = function() {

    var canvas = document.getElementById("spaceField");
    var ctx = canvas.getContext('2d');
    var gameOver = false;

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

    var dx = 0;
    var dy = 0;
    var speed = 100; // px per second
    var activeKey = 0;

    document.addEventListener('keydown', function(e) {
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

    document.addEventListener('keyup', function(e) {
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

    function renderCanvas() {
        ctx.fillStyle = myCanvas.color;
        ctx.fillRect(myCanvas.xStart, myCanvas.yStart, myCanvas.width, myCanvas.height);
    }

    function renderObject(object) {
        ctx.fillStyle = object.color;
        ctx.fillRect(object.x, object.y, object.width, object.height);
    }

    function renderObjects(objectArray){
      for (var i = 0; i < objectArray.length; i++) {
        renderObject(objectArray[i]);
      }
    }

    function isLegalMovement() {
        var notLeft = racer.x >= 0 || dx > 0;
        var notRight = racer.x <= canvas.width - racer.width || dx < 0;
        var notAbove = racer.y >= 0 || dy > 0;
        var notBelow = racer.y <= canvas.height - racer.height || dy < 0;

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

    function race() {
        renderCanvas();

        if (isLegalMovement()) {
            //move racer
            racer.x += dx / 60 * speed;
            racer.y += dy / 60 * speed;
        }

        renderObjects([racer,goal]);

        checkWin();

        requestAnimationFrame(race);
    }

    requestAnimationFrame(race);
}
