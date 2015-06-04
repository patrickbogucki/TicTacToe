function main() {

	var pieceX = "x";
	var pieceO = "o";

	var currentPiece = pieceX; 	// X starts with first move

	var hasPieceMsg = "There is already a piece there.";
	var waitMsg = "Please Wait";
	var gameOverMsg = "Game Over.\nRefresh to play again";
	
	var appeared;

	var game = new Game();

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

				game.checkGameForWin(rowIndex, colIndex);
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

Game.prototype.checkGameForWin = function(row, col) {
	console.log("Checking if last move was a win");
	for(var i = 0; i < this.boardArray.length; i++) {
		for(var j = 0; j < this.boardArray[i].length; j++) {
			if(this.boardArray[i][j] === null) {
				return false;
			}
		}
	}
	this.isGameOver = true;
};

$(document).ready(main);