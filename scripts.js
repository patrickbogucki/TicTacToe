function main() {

	var pieceX = "x";
	var pieceO = "o";

	var currentPiece = pieceX; 	// X starts with first move

	var winLine;

	var verticalLinePixelOffset = 216;

	var hasPieceMsg = "There is already a piece there.";
	var waitMsg = "Please Wait";
	var gameOverMsg = "Game Over.\nRefresh to play again";
	
	var appeared;

	var game = new Game();

	// $('.cell').height($('.cell').width());

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
				game.updateBoardArray(rowIndex, colIndex, currentPiece);
				game.printBoardArray();

				drawPiece(clickedCell, currentPiece);

				if(game.scanRowWin(rowIndex, currentPiece)) {
					drawHorizontalLine(rowIndex + 1);
				}
				else if(game.scanColWin(colIndex, currentPiece)) {
					drawVerticalLine(colIndex + 1);
				}
				else if (game.scanDiagonalWin(rowIndex, colIndex, currentPiece)) {
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

	function toggleCurrentPiece() {
		if(currentPiece === pieceX) {
			currentPiece = pieceO;
			$('.player1Header').css('font-weight', 300);
			$('.player2Header').css('font-weight', 400);
		} else {
			currentPiece = pieceX;
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

$(document).ready(main);