var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var snakeSize = 20;
var w = canvas.width;
var h = canvas.height;
var score = 0;
var snake;
var food;
function init() {
	snake = [];	snake[0] = {
		x: Math.floor(w/snakeSize/2) * snakeSize,
		y: Math.floor(h/snakeSize/2) * snakeSize
	};
	
	food = {
		x: Math.floor(Math.random() * (w/snakeSize)) * snakeSize,
		y: Math.floor(Math.random() * (h/snakeSize)) * snakeSize
	};
	
	dir = "right";
}
init();
function drawSnake() {
	for(var i=0; i<snake.length; i++) {
		var x = snake[i].x;
		var y = snake[i].y;
		
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(x, y, snakeSize, snakeSize);
		
		ctx.strokeStyle = "#000000";
		ctx.strokeRect(x, y, snakeSize, snakeSize);
	}
}
function drawFood() {
	ctx.fillStyle = "#ff0000";
	ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}
function checkCollision(x, y, array) {
	for(var i=0; i<array.length; i++) {
		if(array[i].x == x && array[i].y == y) {
			return true;
		}
	}
	return false;
}
function update() {
	var snakeX = snake[0].x;
	var snakeY = snake[0].y;
	
	if(dir == "right") {
		snakeX += 		snakeSize;
	}
	else if(dir == "left") {
		snakeX -= snakeSize;
	}
	else if(dir == "up") {
		snakeY -= snakeSize;
	}
	else if(dir == "down") {
		snakeY += snakeSize;
	}


	if(snakeX == food.x && snakeY == food.y) {
		var tail = {
			x: snakeX,
			y: snakeY
		};
    score++;

		food = {
			x: Math.floor(Math.random() * (w/snakeSize)) * snakeSize,
			y: Math.floor(Math.random() * (h/snakeSize)) * snakeSize
		};
	}
	else {
		var tail = snake.pop();
		tail.x = snakeX;
		tail.y = snakeY;
	}

	snake.unshift(tail);
	
	if(snakeX < 0 || snakeX >= w || snakeY < 0 || snakeY >= h || checkCollision(snakeX, snakeY, snake.slice(1))) {
		init();
		score = 0;
	}
	
	drawSnake();
	drawFood();

	ctx.fillStyle = "#000000";
	ctx.font = "20px Arial";
	ctx.fillText("Score: " + score, 10, 25);
}
function gameLoop() {
	ctx.clearRect(0, 0, w, h);
	update();
}
setInterval(gameLoop, 100);

function handleKeyPress(event) {
  let key = event.key;
  switch (key) {
    case "w":
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "a":
    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case "s":
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
      }
      break;
    case "d":
    case "ArrowRight":
      if (direction !== "left") {
        direction = "right";
      }
      break;
  }
}

