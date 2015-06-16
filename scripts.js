function main() {

	var pieceX = "x";
	var pieceO = "o";

	var currentPiece = pieceX; 	// X starts with first move

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
				clickedCell.children().remove();
				appeared = false;

				// Log location of click on board
				game.updateBoardArray(rowIndex, colIndex, currentPiece);
				game.printBoardArray();

				drawPiece(clickedCell, currentPiece);

				if(game.scanRowWin(rowIndex, currentPiece)) {
					drawHorizontalLine(rowIndex + 1);
				}
				else if(game.scanColWin(colIndex, currentPiece)) {
					drawVerticalLine(colIndex);
				}

				// game.checkGameForWin(rowIndex, colIndex, currentPiece);

				toggleCurrentPiece();
			}
		}		
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
		var horLine = $('.row').find('.hor-line');
		horLine.animate({width: "100%"}, 2000);
	}

	// Columns are zero indexed
	function drawVerticalLine(col) {
		var vertLineOffset;
		console.log('COL:  ' + col);
		if(col === 0) {
			vertLineOffset = -verticalLinePixelOffset;
		}
		else if(col === 1) {
			vertLineOffset = 0;
		}
		else if(col === 2) {
			vertLineOffset = verticalLinePixelOffset;
		}

		$('.gameboard').append('<div class="vert-line"></div>');
		var vertLine = $('.gameboard').find('.vert-line');
		vertLine.css("left", vertLineOffset);
		vertLine.animate({height: "100%"}, 2000);
	}

	function toggleCurrentPiece() {
		if(currentPiece === pieceX) {
			currentPiece = pieceO;
			$('.playerHeader').css('font-weight', 300);
			$('.AIHeader').css('font-weight', 400);
		} else {
			currentPiece = pieceX;
			$('.playerHeader').css('font-weight', 400);
			$('.AIHeader').css('font-weight', 300);
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
	

	// for(var i = 0; i < this.boardArray.length; i++) {
	// 	for(var j = 0; j < this.boardArray[i].length; j++) {
	// 		if(this.boardArray[i][j] === null) {
	// 			return false;
	// 		}
	// 	}
	// }
	// this.isGameOver = true;

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

$(document).ready(main);