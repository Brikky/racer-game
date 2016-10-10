# Luke Skyracer
___
Star Wars based arcade browser game designed and developed over weekend sprint. 

### URL: [bricky.tech/racer-game/](bricky.tech/racer-game/)

### Features
___
* One and two player modes
* Enemies target players intelligently
* Progressive difficulty as players progress 

### Technologies Used
___
- HTML
  - Canvas
- CSS
- JavaScript
- jQuery

### Code Sample
___
```JavaScript
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
```

### Future Work
___
1. Improve responsiveness on small screens
2. Allow mobile players to move with buttons or joystick


### Screenshots
____

One Player Mode
![One Player Mode](http://i.imgur.com/6B5Wctg.png)

Two Player Mode
![Two PLayer Mode](http://i.imgur.com/sGmJBIW.png)

Win Sequence
![#Winning](http://i.imgur.com/WSy4pvt.png)

Loss Sequence
![Loser](http://i.imgur.com/kJB0hRB.png)
