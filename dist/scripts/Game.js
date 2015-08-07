//////////////////////////////
//	Game 
////////////////////////////

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

Game.prototype.scanForTie = function() {
	for(var i = 0; i < this.boardArray.length; i++) {
		for(var j = 0; j < this.boardArray[i].length; j++) {
			if (this.boardArray[i][j] === null) {
				return false;
			}
		}
	}
	this.isGameOver = true;
	return true;
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