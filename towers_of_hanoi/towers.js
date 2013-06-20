// function TowerWidget(div) {
// 	this.container = div.find("#towers_container");
// }
//
// TowerWidget.prototype.logTowers = function () {
//
// }

Tower.prototype.renderTowers = function () {
	var that = this;

	$("#towers_container .rods ul").each(function (index, element) {
		$(element).empty();

		_(that.size).times(function (n) {
			var value, style;
			var disk = parseInt(that.rods[index][n]);

			if (disk) {
				style = "green";
				value = disk;
			} else {
				value = "&nbsp;"
				style = "none";
			}

			var li = $("<li>" + value + "</li>");
			li.addClass(style);
			li.css('width', (disk * 25) + 40);

			$(element).prepend(li);
		});
	});
}

function Tower(size) {
	this.rods = [[], [], []];
	this.size = (size) || 4;

	for (var i = 1; i <= this.size; i++) {
		this.rods[0].unshift(i);
	}
}

Tower.prototype.logTowers = function () {
	var i;
	for (i = 0; i < 3; i++) {
		console.log(i + 1 + ': ' + this.rods[i]);
	}
}

Tower.prototype.isValidMove = function (from, to) {
	var fromRod = this.rods[from];
	var toRod = this.rods[to];

	if (from < 0 || from > 2 || to < 0 || to > 2) {
		return false;
	}

	if (fromRod.length === 0) {
		return false;
	}

	if (toRod.length === 0) {
		return true;
	}

	if (fromRod[fromRod.length - 1] > toRod[toRod.length - 1]) {
		return false;
	}

	return true;
}

Tower.prototype.moveRod = function (from, to) {
	if (this.isValidMove(from, to)) {
		var disk = this.rods[from].pop();
		this.rods[to].push(disk);
		console.log("move made");
		return true;
	} else {
		console.log("invalid move");
		return false;
	}
}

Tower.prototype.hasWinner = function () {
	var totalDiscs = this.size;
	if (this.rods[2].length === totalDiscs || this.rods[1] === totalDiscs) {
		return true;
	}
	return false;
}

Tower.prototype.renderMessage = function (message, category) {
	var p = $("<p>" + message + "</p>").addClass(category);
	$("#towers_container #messages").append(p);
	console.log(p);
}

Tower.prototype.clearMessages = function () {
	$("#towers_container #messages").empty();
}

Tower.prototype.start = function() {
	var moves = [];
	var that = this;

	console.log("game started");
	that.renderTowers();

	$("ul").click(function () {
		var move = parseInt($(this).attr('class'));
		moves.push(move);
		$(this).addClass("highlight");
		if (moves.length === 2) {
			// TODO: refactor
			// result = that.moveRod(moves[0] - 1, moves[1] - 1);
			// that.renderResult(result);

			that.clearMessages();
			if (!that.moveRod(moves[0] - 1, moves[1] - 1)) {
				that.renderMessage("Invalid move", "error");
			};
			moves = [];
			$('.rods ul').removeClass('highlight');
		}
		that.renderTowers();
	});
}

$(function () {
	var game = new Tower(6);
	game.start();
});

// game = new Tower();
// console.log(game.isValidMove(-1, 0));
//
// console.log(game.hasWinner());
// game.logTowers();
// game.moveRod(0, 1);
// game.logTowers();
// game.moveRod(0, 2);
// game.logTowers();
// game.rods = [[], [], [4, 3, 2, 1]];
// console.log(game.hasWinner());

