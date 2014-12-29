(function (document) {
	'use strict';
	/**
	 * The following are more constant-level variables that don't really have a bearing on the game itself
	 */
	var $d = $(document),
		size = 3,
		minTurnsForWinner = (size * 2) - 1, // there can't be a winner in less than (n * 2) - 1 moves
		maxTurns = Math.pow(size, 2), // only n^2 possible turns
		winningValue = size,
		values = {'X': 1, 'O': -1}, // Keep track of the turn values to change the mapped values
		forwardDiagonal = [], // diagonal that looks like /
		backwardDiagonal = [], // diagonal that looks like \
		// We're going to keep track of the values of diagonals, columns, and rows, in order to determine a winner.
		// If any of the values are of value {size}, then the current turn has won
		// This gives us O(1) time of checking for a winner
		// These are initially set in TicTacToe.resetBoard()
		forwardDiagonalValue,
		backwardDiagonalValue,
		map;

	// We want to generate the diagonal values using the size of the board instead of hard-coding them
	for (var i = 0; i < size; i++) {
		// The forwardDiagonal values' X and Y coordinates will always be the same
		forwardDiagonal.push(String(i) + String(i));

		// The backwardDiagonal values will always be ij, where j is a decreasing value
		// depending on the x coordinate
		backwardDiagonal.push(String(i) + String(size - (i + 1)));
	}

	/**
	 * TicTacToe is the main object that will keep the state of the current game
	 */
	var TicTacToe = function() {
		var self = this;

		/**
		 * Marks a square on the board and checks for winners
		 * Switches turns if a winner is not found
		 */
		self.markSquare = function() {
			var $this = $(this),
				position = String($this.data('position')),
				row = position[0],
				column = position[1];

			$this.html(self.turn);
			$this.addClass('marked');
			self.turnsTaken++;
			self.incrementValues(position, row, column);

			// We only want to start checking for a winner if the minimum number of turns has been met
			if (self.turnsTaken >= minTurnsForWinner && self.checkForWinner(row, column)) {
				self.completeBoard();
				alert(self.turn + ' has won!');
				return;
			} else if (self.turnsTaken === maxTurns) {
				alert('It\'s a Cat\'s Game! No one wins!');
				return;
			}

			self.switchTurn();
		}

		/**
		 * Increments the values of the current row, the current column, and (if the position is part of a diagonal) the
		 * diagonal. If any value is the same as the size of the board, then we have found a winner.
		 * @param {string} position String that looks like 00, 11, etc... that dictates X by Y values on the board
		 */
		self.incrementValues = function(position) {
			var row = position[0],
				column = position[1],
				value = values[self.turn];

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
		}

		/**
		 * Switches the turn of the players
		 */
		self.switchTurn = function() {
			self.turn = (self.turn === 'X') ? 'O' : 'X';
		}

		/**
		 * Given a position on the board, checks whether or not the position is a part of the given diagonal coordinates
		 * @param {array} diagonal An array of possible positions on the diagonal line
		 * @param {string} position String that looks like 00, 11, etc... that dictates X by Y values on the board
		 */
		self.inDiagonal = function(position, diagonal) {
			return diagonal.indexOf(position) >= 0;
		}

		/**
		 * Checks values of row, column, and the diagonal values to see if any of those match the winning value
		 * @param {int} row The row of a square that was just played
		 * @param {int} column The column of a square that was just played
		 */
		self.checkForWinner = function(row, column) {
			// We only care about the absolute biggest value because that will be closest to the winning value
			var maxValue = Math.max(Math.abs(map.rows[row]), Math.abs(map.columns[column]), Math.abs(forwardDiagonalValue), Math.abs(backwardDiagonalValue));

			if (maxValue === winningValue) {
				return true;
			}

			return false;
		}

		/**
		 * Handles the DOM manupilation and any extraneous tasks for completing the board
		 */
		self.completeBoard = function() {
			$('.ttt-square').addClass('marked') // No more turns for you
		}

		/**
		 * Resets the global-level variables and maps in order to start the game over
		 */
		self.resetBoard = function() {
			map = {'rows': {}, 'columns': {}},
			forwardDiagonalValue = 0,
			backwardDiagonalValue = 0;
			$('.ttt-square').html('').removeClass('marked');
			self.turn = 'X'; // X always goes first
			self.turnsTaken = 0;
		}

		/**
		 * Bind click events and handle any pre-game setup
		 */
		self.init = function() {
			self.resetBoard();
			$d
				.on('click', '.ttt-square:not(".marked")', self.markSquare)
				.on('click', '#ttt-reset', self.resetBoard)
			;
		}

		return self.init();
	}

	// Instantiate the game
	new TicTacToe();
})(document);