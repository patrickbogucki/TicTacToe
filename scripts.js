function main() {
	var playerHasCurrentTurn = true;

	$('.cell').on('click', function() {
		$(this).children().remove();
		if(playerHasCurrentTurn) {
			$(this).append('<div class="piece-x"></div>');
			playerHasCurrentTurn = false;
		} else {
			$(this).append('<div class="piece-o"></div>');
			playerHasCurrentTurn = true;
		}
	});
}

$(document).ready(main);