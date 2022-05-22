var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// var img = new Image(); 
// img.src = "img/mario.jpg";
// var brick = document.

//Location of ball in canvas:
let x = canvas.width/2;
let y = canvas.height-30;

//Ball movement:
let dx = 10;
let dy = -6;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;
var ballRadius = 10;
var rightPressed = false;
var leftPressed = false;

// Setting up the brick variables: 
var brickRowCount = 3;
var brickColumnCount = 8;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickOffsetRight = -9.5;

// Brick drawing Logic: 
var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft+brickOffsetRight;
var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;

//Track the Score:
var score = 0;
var bricks = [];

//Player lives: 
var lives = 3;

//How the bricks are placed on the canvas as an array:
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}







// Canvas background image: 
canvas.style.backgroundImage="url('img/mario.jpg')";

// window.onload = function(){
//     var imgWidth = 0; 
//     var scrollSpeed = 10; 

//     function loop(){
//         ctx.drawImage(img, 0, imgWidth);
//         ctx.drawImage(img, 0, imgWidth - canvas.width);
//         imgWidth += scrollSpeed;

//         if(imgWidth == canvas.width){
//             imgWidth = 0;
//             window.requestAnimationFrame(loop);
//         }

//     }
    
// }


// while(score !== brickRowCount*brickColumnCount){

// }

// Keyboard and Mouse game movement:
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

document.addEventListener("dblclick", MouseEvent, false); 




function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    } else{

    }
}


function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}


function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                        confirm("RESTART GAME?");
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "yellow";
    // ctx.strokeStyle = "black";
    //  ctx.strokeStyle = "orange";
    ctx.fill();
    ctx.closePath();
}


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}


function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft+brickOffsetRight;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.strokeStyle = "black";
                // ctx.createPattern("url('img/mario.jpg')");
                ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "red";
                // ctx.strokeStyle = "black";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


function draw() {
    //clears trail that ball is leaving:
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.strokeRect(0,0,canvas.width, canvas.height);
    // ctx.strokeStyle = "black";
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    // loop();
    collisionDetection();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
           if(y= y-paddleHeight){
            dy = -dy  ;
             }
        }
        else {
            lives--;
            if(!lives) {
              alert("GAME OVER");
              document.location.reload();
              confirm("RESTART GAME?");
            }
            else {
              x = canvas.width/2;
              y = canvas.height-30;
              dx = 10;
              dy = -6;
              paddleX = (canvas.width-paddleWidth)/2;
             
            }
          }
        }
        
    
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}

draw();

// drawBricks();

