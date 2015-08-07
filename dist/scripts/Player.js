//////////////////////////////
//	Player
////////////////////////////

function Player(number, score, piece) {
	this._playerNumber = number;
	this._score = score;
	this._piece = piece;
}

Player.prototype.setScore = function(score) {
	this._score = score;
};

Player.prototype.getScore = function() {
	return this._score;
};

Player.prototype.setPiece = function(piece) {
	this._piece = piece;
};

Player.prototype.getPiece = function() {
	return this._piece;
};

Player.prototype.getTitle = function() {
	return 'player' + this._playerNumber;
};