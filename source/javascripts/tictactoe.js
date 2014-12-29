(function (document) {
	'use strict';
	/**
	 * The following are more constant-level variables that don't really have a bearing on the game itself
	 */
	var $d = $(document),
		values = {'X': 1, 'O': -1}; // Keep track of the turn values to change the mapped values

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
			if (self.turnsTaken < self.minTurnsForWinner) {
				self.switchTurn();
				return;
			}

			if (self.checkForWinner(row, column)) {
				self.completeBoard();
				alert(self.turn + ' has won!');
				return;
			} else if (self.turnsTaken === self.maxTurns) {
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

			if (self.inDiagonal(position, self.forwardDiagonal)) {
				self.forwardDiagonalValue += value;
			}

			if (self.inDiagonal(position, self.backwardDiagonal)) {
				self.backwardDiagonalValue += value;
			}

			if (!self.map.rows[row]) {
				self.map.rows[row] = 0;
			}

			if (!self.map.columns[column]) {
				self.map.columns[column] = 0;
			}

			self.map.rows[row] += value;
			self.map.columns[column] += value;
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
			var maxValue = Math.max(Math.abs(self.map.rows[row]), Math.abs(self.map.columns[column]), Math.abs(self.forwardDiagonalValue), Math.abs(self.backwardDiagonalValue));

			if (maxValue === self.winningValue) {
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
		 * Rebuilds the tic-tac-toe table when the size has been changed
		 * In a perfect world, this would be a view
		 */
		self.rebuildTable = function() {
			var $table = $('#ttt-table');
			var $rows = '';
			for (var i = (self.size - 1); i >= 0; i--) {
				$rows += '<tr class="ttt-row">';
				for (var j = 0; j <= (self.size - 1); j++) {
					$rows += '<td class="ttt-square" data-position="' + (String(i) + String(j)) + '"></td>';
				}
				$rows += '</tr>';
			}
			$table.html($rows);
		}

		/**
		 * If a game is restarted, reset object level variables to clean it for a new game
		 */
		self.resetObject = function(size) {
			// We don't need to rebuild the table and reset limits all of the time, just when things change
			if (size !== self.size) {
				// Set some kind of limits
				if (size <= 2 || size > 10) {
					$('#ttt-size').val(3);
					size = 3;
				}

				self.size = size;
				self.resetValues();
				self.rebuildDiagonals();
				self.rebuildTable();
			}

			// These will always need to be reset
			self.turn = 'X'; // X always goes first
			self.turnsTaken = 0;
		}

		/**
		 * Resets the diagonal values as well as the row and column value maps
		 */
		self.resetValues = function() {
			self.minTurnsForWinner = (self.size * 2) - 1; // there can't be a winner in less than (n * 2) - 1 moves
			self.maxTurns = Math.pow(self.size, 2); // only n^2 possible turns
			self.winningValue = self.size;
			// We're going to keep track of the values of diagonals, columns, and rows, in order to determine a winner.
			// If any of the values are of value {size}, then the current turn has won
			// This gives us O(1) time of checking for a winner
			// These are initially set in TicTacToe.resetBoard()
			self.forwardDiagonalValue = 0;
			self.backwardDiagonalValue = 0;
			self.map = {'rows': {}, 'columns': {}};
		}

		/**
		 * Rebuilds the array of coordinates that are part of the two diagonals
		 */
		self.rebuildDiagonals = function() {
			self.forwardDiagonal = [], // diagonal that looks like /
			self.backwardDiagonal = []; // diagonal that looks like \
			// We want to generate the diagonal values using the size of the board instead of hard-coding them
			for (var i = 0; i < self.size; i++) {
				// The forwardDiagonal values' X and Y coordinates will always be the same
				self.forwardDiagonal.push(String(i) + String(i));

				// The backwardDiagonal values will always be ij, where j is a decreasing value
				// depending on the x coordinate
				self.backwardDiagonal.push(String(i) + String(self.size - (i + 1)));
			}
		}

		/**
		 * Resets the global-level variables and maps in order to start the game over
		 */
		self.resetBoard = function() {
			var size = +$('#ttt-size').val() || 3;
			$('.ttt-square').html('').removeClass('marked');
			self.resetObject(size);
			self.resetValues();
			self.rebuildDiagonals();
		}

		/**
		 * Handle any pre-game setup
		 */
		self.init = function() {
			self.resetBoard(self.size);
		}

		return self.init();
	}

	// Instantiate the game when DOM is rendered because we want to check the value of the input
	$d.ready(function() {
		var game = new TicTacToe();
		// Bind click events to the DOM
		$d
			.on('click', '.ttt-square:not(".marked")', game.markSquare)
			.on('click', '.ttt-reset', game.resetBoard)
		;
	});

})(document);