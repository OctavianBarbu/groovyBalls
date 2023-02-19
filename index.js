var canvas = document.getElementById("canvas");
var canvasContext2D = canvas.getContext("2d");
var maxPositionX = window.innerWidth;
var maxPositionY = window.innerHeight;
canvas.width = maxPositionX;
canvas.height = maxPositionY;

var mousePositionX = 0;
var mousePositionY = 0;

document.addEventListener("mousemove", function (event) {
    mousePositionX = event.clientX;
    mousePositionY = event.clientY;
})


function randomColor() {
    let randomRedAmmount = Math.round(Math.random() * 250);
    let randomGreenAmmount = Math.round(Math.random() * 250);
    let randomBlueAmmount = Math.round(Math.random() * 250);
    let randomOpacity = Math.ceil(Math.random() * 10) / 10;
    return `rgba(${randomRedAmmount}, ${randomGreenAmmount}, ${randomBlueAmmount}, ${randomOpacity})`
  }

class Ball {
    constructor() {
        this.color = randomColor();
        this.radius = Math.random() * 20 + 15;
        this.initialRadius = this.radius;
        this.positionX = Math.random() * (maxPositionX - this.radius * 2) + this.radius;
        this.positionY = Math.random() * (maxPositionY - this.radius);
        this.incrementY = Math.random() * 2;
        this.incrementX = Math.round((Math.random() - 0.5) * 10);
        this.vel = Math.random() / 5;
        this.update = function () {
            canvasContext2D.beginPath();
            canvasContext2D.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
            canvasContext2D.fillStyle = this.color;
            canvasContext2D.fill();
        };
    }
}

var ballList = [];
for (var i = 0; i < 51; i++) {
    ballList.push(new Ball());
}

setInterval(function () {
    ballList.push(new Ball());
    ballList.splice(0, 1);
    
},500);

function animate() {
    if (maxPositionX != window.innerWidth || maxPositionY != window.innerHeight) {
        maxPositionX = window.innerWidth;
        maxPositionY = window.innerHeight;
        canvas.width = maxPositionX;
        canvas.height = maxPositionY;
    }
    requestAnimationFrame(animate);
    canvasContext2D.clearRect(0, 0, maxPositionX, maxPositionY);
    for (var i = 0; i < ballList.length; i++) {
        currentBall = ballList[i];
        currentBall.update();
        currentBall.positionY += currentBall.incrementY;
        currentBall.positionX += currentBall.incrementX;
        if (currentBall.positionY + currentBall.radius >= maxPositionY) {
            currentBall.incrementY = -currentBall.incrementY;
        } else {
            currentBall.incrementY += currentBall.vel;
        }
        if (currentBall.positionX + currentBall.radius > maxPositionX || currentBall.positionX - currentBall.radius < 0) {
            currentBall.incrementX = -currentBall.incrementX;
        }
        if (mousePositionX > currentBall.positionX - currentBall.radius &&
            mousePositionX < currentBall.positionX + currentBall.radius &&
            mousePositionY > currentBall.positionY - currentBall.radius &&
            mousePositionY < currentBall.positionY + currentBall.radius &&
            currentBall.radius < 70) {
                currentBall.radius += 5;
        } else {
            if (currentBall.radius > currentBall.initialRadius) {
                currentBall.radius += -5;
            }
        }
    }
}

window.animate();