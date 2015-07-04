function main() {

	var pieceX = "x";
	var pieceO = "o";

	var currentPiece = null; 	// X starts with first move
	var currentTurn = null;

	var winLine;

	var verticalLinePixelOffset = 216;

	var hasPieceMsg = "There is already a piece there.";
	var waitMsg = "Please Wait";
	var gameOverMsg = "Game Over.\nRefresh to play again";
	
	var appeared;

	var game = new Game();

	// Player pieces will be set once player 1 has chosen their piece
	var player1 = new Player(1, 0, null);
	var player2 = new Player(2, 0, null);

	// $('.cell').height($('.cell').width());

	// Close modal when clicking around it
	$('.piece-selection-modal').on('click', function() {
		return false;
	});

	$('.piece-selection-container').on('click', function() {
		$('.piece-selection-container').css({
			display: 'none'
		});
	});

	$('.piece-selection-x').on('click', function() {
		game.setPlayer1Piece = pieceX;
		game.setPlayer2Piece = pieceO;
		$('.piece-selection-container').css({
			display: 'none'
		});
		player1 = new Player(1, 0, pieceX);
		player2 = new Player(2, 0, pieceO);
		currentTurn = player1;
	});

	$('.piece-selection-o').on('click', function() {
		game.setPlayer1Piece = pieceO;
		game.setPlayer2Piece = pieceX;
		$('.piece-selection-container').css({
			display: 'none'
		});
		player1 = new Player(1, 0, pieceO);
		player2 = new Player(2, 0, pieceX);
		currentTurn = player1;
	});

	$('.cell').on('click', function() {
		var clickedCell = $(this);
		var rowIndex = clickedCell.closest('.row').index('.row');
		var colIndex = clickedCell.index();

		if(game.isGameOver) {
			drawAlertMessage(gameOverMsg);
		} else {
			if(game.cellContainsPiece(rowIndex, colIndex)) {
				drawAlertMessage(hasPieceMsg);
			} else if(appeared === false) {
				drawAlertMessage(waitMsg);
			} else {
				// clickedCell.children().remove();
				appeared = false;

				// Log location of click on board
				game.updateBoardArray(rowIndex, colIndex, currentTurn.getPiece());
				game.printBoardArray();

				drawPiece(clickedCell, currentTurn.getPiece());

				// Check if game was won and in which direction
				if(game.scanRowWin(rowIndex, currentTurn.getPiece())) {
					drawHorizontalLine(rowIndex + 1);
				}
				else if(game.scanColWin(colIndex, currentTurn.getPiece())) {
					drawVerticalLine(colIndex + 1);
				}
				else if (game.scanDiagonalWin(rowIndex, colIndex, currentTurn.getPiece())) {
					drawDiagonalLine(rowIndex + 1, colIndex + 1);
				}
				toggleCurrentPiece();
			}
		}		
	});

	$('.new-game').on('click', function() {
		resetGameBoard();
	});

	function drawAlertMessage(message) {
		$('.alert-message').text(message);
		$('.alert-message').finish()
			.css('display', 'none')
			.fadeIn('slow')
			.delay(1000)
			.fadeOut('slow', function() {
			});
	}

	function drawPiece(cell, pieceSymbol) {
		cell.append('<div class=piece-' + pieceSymbol + '></div>');
		cell.find('.piece-' + pieceSymbol).fadeIn('slow', function() {
			appeared = true;
		});
	}

	function drawHorizontalLine(row) {
		$('.row:nth-of-type(' + row + ')').append('<div class="hor-line"></div>');
		winLine = $('.row').find('.hor-line');
		winLine.animate({width: "100%"}, 2000);
	}

	function drawVerticalLine(col) {
		var vertLineOffset;
		console.log('COL:  ' + col);
		if(col === 1) {
			vertLineOffset = -verticalLinePixelOffset;
		}
		else if(col === 2) {
			vertLineOffset = 0;
		}
		else if(col === 3) {
			vertLineOffset = verticalLinePixelOffset;
		}

		$('.gameboard').append('<div class="vert-line"></div>');
		winLine = $('.gameboard').find('.vert-line');
		winLine.css("left", vertLineOffset);
		winLine.animate({height: "100%"}, 2000);
	}

	// Change to use CSS stored lines (diag-top and diag-bot)
	function drawDiagonalLine(row, col) {
		if((row === 1 && col === 1) || (row === 3 && col === 3)) {
			$('.gameboard').append('<div class="diag-line-top"></div>');
			winLine = $('.diag-line-top');
		} else {
			$('.gameboard').append('<div class="diag-line-bot"></div>');
			winLine = $('.diag-line-bot');
		}
		winLine.append('<div class="diag-line-after"></div>');
		$('.diag-line-after').animate({width: "420px"}, 2000);
	}

	// Switch to opposite players turn and adjust styling
	function toggleCurrentPiece() {
		if(currentTurn === player1) {
			currentTurn = player2;
			$('.player1Header').css('font-weight', 300);
			$('.player2Header').css('font-weight', 400);
		} else {
			currentTurn = player1;
			$('.player1Header').css('font-weight', 400);
			$('.player2Header').css('font-weight', 300);
		}
	}

	function resetGameBoard () {
		game.resetGameBoard();
		$('.cell').children().remove();
		if(winLine !== undefined) {
			winLine.remove();
		}
	}
}

function Game() {
	this.boardArray = [
		[null, null, null],
		[null, null, null],
		[null, null, null]
	];
	this.isGameOver = false;
	console.log("New game started.");
}

Game.prototype.updateBoardArray = function(row, col, currentPiece) {
	this.boardArray[row][col] = currentPiece;
};

Game.prototype.printBoardArray = function() {
	console.log("");
	var line = "";
	for(var i = 0; i < this.boardArray.length; i++) {
		for(var j = 0; j < this.boardArray[i].length; j++) {
			line = line + this.boardArray[i][j] + ', ';
		}
		console.log(line);
		line = "";
	}
};

Game.prototype.cellContainsPiece = function(row, col) {
	return (this.boardArray[row][col] !== null);
};

Game.prototype.checkGameForWin = function(row, col, currentPiece) {
	console.log("Checking if last move was a win");
	if(this.scanRowWin(row, currentPiece) || 
		this.scanColWin(col, currentPiece)) {
		this.isGameOver = true;
	}
};

Game.prototype.scanRowWin = function(row, currentPiece) {
	for(var i = 0; i < this.boardArray[row].length; i++) {
		console.log(this.boardArray[row][i] + ' ' + currentPiece);
		if(this.boardArray[row][i] !== currentPiece) {
			return false;
		}
	}
	this.isGameOver = true;
	return true;
};

Game.prototype.scanColWin = function(col, currentPiece) {
	for(var i = 0; i < this.boardArray.length; i++) {
		if(this.boardArray[i][col] !== currentPiece) {
			return false;
		}
	}
	this.isGameOver = true;
	return true;
};

Game.prototype.scanDiagonalWin = function(row, col, currentPiece) {
	if(row === 1 && col === 1) {
		if(this.boardArray[0][0] === currentPiece && this.boardArray[2][2] === currentPiece) {
			this.isGameOver = true;
			return true;
		}
		else if(this.boardArray[0][2] === currentPiece && this.boardArray[2][0] === currentPiece) {
			this.isGameOver = true;
			return true;
		}
	}
	else if(row === 0 && col === 0) {
		if(this.boardArray[1][1] === currentPiece && this.boardArray[2][2] === currentPiece) {
			this.isGameOver = true;
			return true;
		}
	}
	else if(row === 0 && col === 2) {
		if(this.boardArray[1][1] === currentPiece && this.boardArray[2][0] === currentPiece) {
			this.isGameOver = true;
			return true;
		}
	}
	else if(row === 2 && col === 0) {
		if(this.boardArray[1][1] === currentPiece && this.boardArray[0][2] === currentPiece) {
			this.isGameOver = true;
			return true;
		}
	}
	else if(row === 2 && col === 2) {
		if(this.boardArray[1][1] === currentPiece && this.boardArray[0][0] === currentPiece) {
			this.isGameOver = true;
			return true;
		}
	}
};

Game.prototype.setPlayer1Piece = function(piece) {
	this.player1Piece = piece;
};

Game.prototype.setPlayer2Piece = function(piece) {
	this.player2Piece = piece;
};

// TODO
Game.prototype.resetGameBoard = function() {
	this.boardArray = [
		[null, null, null],
		[null, null, null],
		[null, null, null]
	];
	this.isGameOver = false;

	console.log("New game started.");
};

function Player(number, score, piece) {
	this._playerNumber = number; // 1, 2 with respect to player 1 and player 2
	this._score = score;
	this._piece = piece;
}

Player.prototype.setScore = function(score) {
	this._score = score;
};

Player.prototype.setPiece = function(piece) {
	this._piece = piece;
};

Player.prototype.getPiece = function() {
	return this._piece;
};

$(document).ready(main);

