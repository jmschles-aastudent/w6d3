function TicTacToe() {
  this.board = [['_', '_', '_'],
							  ['_', '_', '_'],
								['_', '_', '_']];

	// this.players = [new Player('x'), new Player('o')];
	this.players = ['x', 'o'];
	this.turn = 0;
}

TicTacToe.prototype.hasWinner = function () {
	var wins = [[[0, 0], [0, 1], [0, 2]], // horizontals
							[[1, 0], [1, 1], [1, 2]],
							[[2, 0], [2, 1], [2, 2]],
							[[0, 0], [1, 0], [2, 0]], // verticals
							[[0, 1], [1, 1], [2, 1]],
							[[0, 2], [1, 2], [2, 2]],
							[[0, 0], [1, 1], [2, 2]], // diagonals
							[[0, 2], [1, 1], [2, 0]],
							];

	for (var player = 0; player < 2; player++) {
		for (var winRow = 0, len = wins.length; winRow < len; winRow++) {
			var win = true;

			for (var winCol = 0; winCol < 3; winCol++) {
				var coord = wins[winRow][winCol];
				var row = coord[0];
				var col = coord[1];

				if (this.board[row][col] !== this.players[player]) {
					win = false;
					break;
				}
			}
			if (win) { return true; }
		}
	}
	return false;
}

TicTacToe.prototype.isValidMove = function (coords) {
	if (this.hasWinner()) {
		return false;
	}

	var row = coords[0];
	var col = coords[1];
	if (this.board[row][col] === '_') {
		return true;
	}
	return false;
}

TicTacToe.prototype.move = function (coords) {
	if (this.isValidMove(coords)) {
		var turn = this.turn;
		this.board[coords[0]][coords[1]] = this.players[turn]
		this.turn = (turn === 0) ? 1 : 0;
		return true;
	} else {
		console.log("Invalid move");
		return false;
	}
}

TicTacToe.prototype.showBoard = function () {
	console.log('-------');
	console.log(this.board[0]);
	console.log(this.board[1]);
	console.log(this.board[2]);
}

TicTacToe.prototype.renderBoard = function() {
	var that = this;
	$("section").each(function (outerIdx, el1) {
		console.log(this);
		$(this).find("div").each(function (innerIdx, el2) {
			$(el2).html(that.board[outerIdx][innerIdx]);
		});
	});
}

TicTacToe.prototype.renderTile = function(tile) {
	if (this.turn) {
		$(tile).css('background-color', "#600");
	} else {
		$(tile).css('background-color', "#006");
	}

	if (this.hasWinner()) {
		if (this.turn) {
			$(tile).css('background-color', "#b00");
		} else {
			$(tile).css('background-color', "#00b");
		}
	}
}

TicTacToe.prototype.start = function() {
	var that = this;

	$("div").click(function () {
		var parent = $(this).parents("section");
		var row = parseInt(parent.attr("class"));
		var col = parseInt($(this).attr("class"));

		if (that.move([row, col])) {
			that.renderTile($(this));
		} else {
			console.log("nope");
			$(this).fadeTo("fast", .5).fadeTo("fast", 1.0);
		};
	});
}


$(function () {
	game = new TicTacToe();
	game.start();
})

// game.showBoard();
// game.move([0, 0]);
// game.showBoard();
// game.move([0, 1]);
// game.showBoard();
// game.move([0, 1]);
// game.showBoard();
// game.board = [['x', '_', '_'],
// 							['_', 'x', '_'],
// 							['_', '_', 'x']];
// game.showBoard();
//
// console.log('winner?' + game.hasWinner());

