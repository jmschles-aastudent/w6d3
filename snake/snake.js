function Snake(startRow, startCol) {
	var that = this;

	this.body = [];
	this.size = 3;
	this.dir = "east";

	// generate snake
	_(this.size).times(function (n) {
		that.body[n] = ([startRow, startCol + n]);
	});
}


Snake.prototype.turn = function (dir) {
	if (this.dir === dir) {
		return;
	}
	switch (dir) {
		case "north":
			if (this.dir !== "south") {
				this.dir = dir;
			}
			break;
		case "south":
			if (this.dir !== "north") {
				this.dir = dir;
			}
			break;
		case "east":
			if (this.dir !== "west") {
				this.dir = dir;
			}
			break;
		case "west":
			if (this.dir !== "east") {
				this.dir = dir;
			}
			break;
		default:
			console.log("Unrecognized direction");
	}

	this.dir = dir;
}

function Board(numRows, numCols) {
	var that = this;
	this.dimensions = [numCols, numRows];
	this.snake = new Snake(parseInt(numRows / 2), Math.floor(numCols / 2));

	this.grid = [];
	this.apple = [];

	// generate grid
	_(numRows).times(function (r) {
		that.grid[r] = [];
		_(numCols).times(function (c) {
			that.grid[r][c] = null;
		});
	});

	// place an apple
	this.generateApple();

}

Board.prototype.step = function () {

	var head = this.snake.body[0];
	switch (this.snake.dir) {
		case "east":
			this.snake.body.unshift([head[0], head[1] - 1]);
			break;
		case "west":
			this.snake.body.unshift([head[0], head[1] + 1]);
			break;
		case "north":
			this.snake.body.unshift([head[0] - 1, head[1]]);
			break;
		case "south":
			this.snake.body.unshift([head[0] + 1, head[1]]);
			break;
		default:
			console.log("Step failed");
	}
	if (this.snake.body[0] !== this.apple) {
		this.snake.body.pop();
	} else {
		this.generateApple();
	}

	console.log(this.snake.body);
}

Board.prototype.generateApple = function() {
	xCoord = Math.floor(Math.random() * this.dimensions[0]);
	yCoord = Math.floor(Math.random() * this.dimensions[1]);
	this.apple = [xCoord, yCoord];
}

// var board = new Board(10, 20);
// console.log(board.apple);
// board.step();
// board.step();
// board.step();
// board.snake.turn("north");
// board.step();
// board.step();
// board.snake.turn("west");
// board.step();
// board.step();

