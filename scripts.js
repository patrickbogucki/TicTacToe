function main() {
	var boardArray = [
		[false, false, false],
		[false, false, false],
		[false, false, false]
	];
	var playerHasCurrentTurn = true;
	var hasPieceMsg = "There is already a piece there.";
	var waitMsg = "Please Wait";
	var appeared;

	$('.cell').on('click', function() {
		if(containsPiece($(this))) {
			$('.alert-message').text(hasPieceMsg);
			$('.alert-message').finish().css('display', 'none').fadeIn('slow').delay(1000).fadeOut('slow', function() {
 			});
		} else if(appeared === false) {
			$('.alert-message').text(waitMsg);
			$('.alert-message').finish().css('display', 'none').fadeIn('slow').delay(1000).fadeOut('slow', function() {
 			});
		} else {
			$(this).children().remove();
			appeared = false;
			if(playerHasCurrentTurn) {
				$(this).append('<div class="piece-x"></div>');
				$(this).find('.piece-x').fadeIn(1000, function() {
					appeared = true;
				});
				
				playerHasCurrentTurn = false;
			} else {
				$(this).append('<div class="piece-o"></div>');
				$(this).find('.piece-o').fadeIn(1000, function() {
					appeared = true;
				});

				playerHasCurrentTurn = true;
			}
		}
	});

	function containsPiece(cell) {
		if(cell.children().length > 0) {
			return true;
		} else {
			return false;
		}
	}
}

$(document).ready(main);