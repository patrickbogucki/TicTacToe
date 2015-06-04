function main() {

	var pieceXClass = "x";
	var pieceOClass = "o";

	var boardArray = [
		[null, null, null],
		[null, null, null],
		[null, null, null]
	];
	var currentPiece = pieceXClass; // X starts with first move
	var hasPieceMsg = "There is already a piece there.";
	var waitMsg = "Please Wait";
	var appeared;

	$('.cell').on('click', function() {
		var clickedCell = $(this);
		if(containsPiece(clickedCell)) {
			drawAlertMessage(hasPieceMsg);
		} else if(appeared === false) {
			drawAlertMessage(waitMsg);
		} else {
			clickedCell.children().remove();
			appeared = false;

			// Log location of click on board
			var rowIndex = clickedCell.closest('.row').index('.row');
			var colIndex = clickedCell.index();
			boardArray[rowIndex][colIndex] = currentPiece;

			drawPiece(clickedCell, currentPiece);
			
			// Print out board array
			console.log("");
			var line = "";
			for(var i = 0; i < boardArray.length; i++) {
				for(var j = 0; j < boardArray[i].length; j++) {
					line = line + boardArray[i][j] + ', ';
				}
				console.log(line);
				line = "";
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

	function containsPiece(cell) {
		if(cell.children().length > 0) {
			return true;
		} else {
			return false;
		}
	}

	function drawPiece(cell, pieceSymbol) {
		cell.append('<div class=piece-' + pieceSymbol + '></div>');
		cell.find('.piece-' + pieceSymbol).fadeIn('slow', function() {
			appeared = true;
		});
		
		if(currentPiece === pieceXClass) {
			currentPiece = pieceOClass;
			$('.playerHeader').css('font-weight', 300);
			$('.AIHeader').css('font-weight', 400);
		} else {
			currentPiece = pieceXClass;
			$('.playerHeader').css('font-weight', 400);
			$('.AIHeader').css('font-weight', 300);
		}
	}
}

$(document).ready(main);