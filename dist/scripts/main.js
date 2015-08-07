function main() {

	var pieceX = "x";
	var pieceO = "o";

	var currentTurnPlayer;

	var winLine;

	var verticalLinePixelOffset = 216;

	var hasPieceMsg = "There is already a piece there.";
	var tieGameMsg = "The game has ended in a Tie!";
	var gameOverMsg = "Game Over.\n Click 'New Game' to play again.";

	var game = new Game();

	// Player pieces will be set once player 1 has chosen their piece
	var player1 = new Player(1, 0, null);
	var player2 = new Player(2, 0, null);

	$('.piece-selection-container').css({
		display: 'block'
	});

	$('.piece-selection-x').parent().on('click', function() {
		game.setPlayer1Piece = pieceX;
		game.setPlayer2Piece = pieceO;
		player1 = new Player(1, 0, pieceX);
		player2 = new Player(2, 0, pieceO);
		$('.piece-selection-container').css({
			display: 'none'
		});
		currentTurnPlayer = player1;
	});

	$('.piece-selection-o').parent().on('click', function() {
		game.setPlayer1Piece = pieceO;
		game.setPlayer2Piece = pieceX;
		player1 = new Player(1, 0, pieceO);
		player2 = new Player(2, 0, pieceX);
		$('.piece-selection-container').css({
			display: 'none'
		});
		currentTurnPlayer = player1;
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
			} else {
				// Log location of click on board
				game.updateBoardArray(rowIndex, colIndex, currentTurnPlayer.getPiece());
				game.printBoardArray();

				// Draw current players piece in cell that was clicked
				drawPiece(clickedCell, currentTurnPlayer.getPiece());

				// Check if game was won and in which direction
				// If game was won, draw line through winning pieces
				if(game.scanRowWin(rowIndex, currentTurnPlayer.getPiece())) {
					drawHorizontalLine(rowIndex + 1);
				}
				else if(game.scanColWin(colIndex, currentTurnPlayer.getPiece())) {
					drawVerticalLine(colIndex + 1);
				}
				else if (game.scanDiagonalWin(rowIndex, colIndex, currentTurnPlayer.getPiece())) {
					drawDiagonalLine(rowIndex + 1, colIndex + 1);
				}
				else if(game.scanForTie()) {
					drawAlertMessage(tieGameMsg);
					$('.outcome').html('Tie Game');
					$('.new-game').addClass('new-game-blink');
					return;
				}
				// If game is over increment winners score and update scoreboard
				// Else change turn to opposite player
				if(game.isGameOver) {
					currentTurnPlayer.setScore(currentTurnPlayer.getScore() + 1);
					updateScores();
					enableNewGameLoserModalButton();
					$('.outcome').html("Player " + currentTurnPlayer._playerNumber + " wins!");
					$('.new-game').addClass('new-game-blink');
				} else {
					toggleCurrentPiece();
				}
				
			}
		}		
	});
	
//////////////////////////////
//	New Game Modal
////////////////////////////

	$('.new-game').on('click', function() {
		$('.new-game-container').css({
			display: 'block'
		});
	});
	
	// Close modal if clicked around it
	$('.new-game-container').on('click', function() {
		$('.container-modal').css({
			display: 'none'
		});
	});

	// Prevent modal closing when clicking on itself
	$('.new-game-modal').on('click', function() {
		return false;
	});

	$('.new-game-yes-player1').on('click', function() {
		$('.new-game').removeClass('new-game-blink');
		resetGameBoard();
		setTurn(player1);
		$('.outcome').html('');
		$('.new-game-container').css({
			display: 'none'
		});
		$('.new-game-loser').addClass('modal-button-disabled');
	});

	$('.new-game-yes-player2').on('click', function() {
		$('.new-game').removeClass('new-game-blink');
		resetGameBoard();
		setTurn(player2);
		$('.outcome').html('');
		$('.new-game-container').css({
			display: 'none'
		});
		$('.new-game-loser').addClass('modal-button-disabled');
	});

	$('.new-game-loser').on('click', function() {
		$('.new-game').removeClass('new-game-blink');
		if(game.isGameOver) {
			resetGameBoard();
			$('.outcome').html('');
			if(currentTurnPlayer === player1) {
				setTurn(player2);
			} else {
				setTurn(player1);
			}
			$('.new-game-container').css({
				display: 'none'
			});
			$('.new-game-loser').addClass('modal-button-disabled');
		}
	});

	$('.new-game-no').on('click', function() {
		$('.new-game-container').css({
			display: 'none'
		});
	});


//////////////////////////////
//	Clear Scores Modal
////////////////////////////

	$('.clear-game').on('click', function() {
		$('.clear-scores-container').css({
			display: 'block'
		});
	});

	$('.clear-scores-yes').on('click', function() {
		resetScores();
		$('.clear-scores-container').css({
			display: 'none'
		});
	});

	$('.clear-scores-no').on('click', function() {
		$('.clear-scores-container').css({
			display: 'none'
		});
	});

	$('.clear-scores-container').on('click', function() {
		$('.container-modal').css({
			display: 'none'
		});
	});


	function drawAlertMessage(message) {
		$('.alert-message').text(message);
		$('.alert').finish()
			.css('display', 'none')
			.fadeIn('slow')
			.delay(1000)
			.fadeOut('slow', function() {
			});
	}

	function drawPiece(cell, pieceSymbol) {
		cell.append('<div class="piece-' + pieceSymbol + '"></div>');
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
		if(currentTurnPlayer === player1) {
			setTurn(player2);
		} else {
			setTurn(player1);
		}
	}
	// Clears board of all pieces and removes win line
	function resetGameBoard () {
		game.resetGameBoard();
		$('.cell').children().remove();
		if(winLine !== undefined) {
			winLine.remove();
		}
	}

	// Changes turn of current player and updates scoreboard CSS to
	// show whose turn it is
	function setTurn(player) {
		currentTurnPlayer = player;

		// Reset scoreboard fontweights
		if(player === player1) {
			$('.' + player1.getTitle() + 'Header').addClass('header-current-turn');
			$('.' + player2.getTitle() + 'Header').removeClass('header-current-turn');	
		} else {
			$('.' + player2.getTitle() + 'Header').addClass('header-current-turn');
			$('.' + player1.getTitle() + 'Header').removeClass('header-current-turn');
		}
	}

	// Update scoreboard to reflect players scores
	function updateScores() {
		$('.player1Score').html(player1.getScore());
		$('.player2Score').html(player2.getScore());
	}

	// Set both players scores to 0
	function resetScores() {
		player1.setScore(0);
		player2.setScore(0);
		updateScores();
	}

	// Button is enabled when there is a winner, otherwise it can't be
	// used if there is no loser
	function enableNewGameLoserModalButton() {
		$('.new-game-loser').removeClass('modal-button-disabled');
	}
}

$(document).ready(main);

