'use strict';
(function (document) {
	var $d = $(document),
		size = 3,
		map,
		minTurnsForWinner = (size * 2) - 1, // there can't be a winner in less than (n * 2) - 1 moves
		maxTurns = Math.pow(size, 2), // only n^2 possible turns
		winningValue = size,
		forwardDiagonal = [], // diagonal that looks like /
		backwardDiagonal = [], // diagonal that looks like \
		forwardDiagonalValue,
		backwardDiagonalValue,
		values = {'X': 1, 'O': -1};

	// We want to generate the diagonal values
	for (var i = 0; i < size; i++) {

		// The forwardDiagonal values' X and Y coordinates will always be the same
		forwardDiagonal.push(String(i) + String(i));

		// The backwardDiagonal values will always be ij, where j is a decreasing value
		// depending on the x coordinate
		backwardDiagonal.push(String(i) + String(size - (i + 1)));
	}

	var TicTacToe = function() {
		var self = this;

		self.markSquare = function() {
			var $this = $(this),
				position = String($this.data('position')),
				row = position[0],
				column = position[1],
				value = values[self.turn];

			$this.html(self.turn);
			$this.addClass('marked');
			self.numTurns++;

			if (self.inDiagonal(position, forwardDiagonal)) {
				forwardDiagonalValue += value;
			}

			if (self.inDiagonal(position, backwardDiagonal)) {
				backwardDiagonalValue += value;
			}

			if (!map.rows[row]) {
				map.rows[row] = 0;
			}

			if (!map.columns[column]) {
				map.columns[column] = 0;
			}

			map.rows[row] += value;
			map.columns[column] += value;

			if (self.numTurns >= minTurnsForWinner && self.checkForWinner(row, column)) {
				alert(self.turn + ' has won!');
				return;
			}

			self.switchTurn();
		}

		self.switchTurn = function() {
			self.turn = (self.turn === 'X') ? 'O' : 'X';
		}

		self.inDiagonal = function(position, diagonal) {
			return diagonal.indexOf(position) >= 0;
		}

		self.checkForWinner = function(row, column) {
			// We only care about the biggest value
			var maxValue = Math.max(Math.abs(map.rows[row]), Math.abs(map.columns[column]), Math.abs(forwardDiagonalValue), Math.abs(backwardDiagonalValue));

			if (maxValue === winningValue) {
				return true;
			}

			return false;
		}

		self.resetBoard = function() {
			map = {'rows': {}, 'columns': {}},
			forwardDiagonalValue = 0,
			backwardDiagonalValue = 0;
			$('.ttt-square').html('').removeClass('marked');
			self.turn = 'X'; // X always goes first
			self.numTurns = 0;
		}

		self.init = function() {
			self.resetBoard();
			$d
				.on('click', '.ttt-square:not(".marked")', self.markSquare)
				.on('click', '#ttt-reset', self.resetBoard)
			;
		}

		return self.init();
	}

	new TicTacToe();
})(document);