var _ = require('underscore');

function Snake(startRow, startCol) {
	var that = this;

	this.body = [];
	this.size = 3;
	this.dir =

	// generate snake
	_(this.size).times(function (n) {
		that.body[n] = ([startRow, startCol - n]);
	});

	console.log(this.body);
}


Snake.prototype.turn = function () {
}

function Board(numRows, numCols) {
	var that = this;
	this.snake = new Snake(parseInt(numRows / 2), Math.floor(numCols / 2));

	this.grid = [];
	this.apples = [[0, 1], [5, 2]];

	// generate grid
	_(numRows).times(function (r) {
		that.grid[r] = [];
		_(numCols).times(function (c) {
			that.grid[r][c] = null;
		});
	});

}

Board.prototype.step = function () {
	var headFromTail = this.snake.body.pop();
}

Board.prototype.

board = new Board(10, 20);
console.log(board.grid[0].length);

