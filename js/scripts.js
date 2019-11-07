function Spaces() {
  this.spA = [[0,0], [3,0], [6,0]];
  this.spB = [[0,1], [4,0]];
  this.spC = [[0,2], [5,0], [7,2]];
  this.spD = [[1,0], [3,1]];
  this.spE = [[1,1], [4,1], [6,1], [7,1]];
  this.spF = [[1,2], [5,1]];
  this.spG = [[2,0], [3,2], [7,0]];
  this.spH = [[2,1], [4,2]];
  this.spI = [[2,2], [5,2], [6,2]];
}

function makeThreeInRows() {
  var result = [];
  for (var i = 0; i < 8; i++) {
    result.push([false,false,false]);
  }
  return result;
}

function Board() {
  this.threeInRows = makeThreeInRows();
  this.spaces = new Spaces();
  this.spacesKeys = ["spA","spB","spC","spD","spE","spF","spG","spH","spI"];
  this.winner = false;
  this.currentPlayer = false;
}

Board.prototype.selectSpace = function (spaceId, playerLetter) {
  var spaceMap = this.spaces[spaceId];
  var thisBoard = this;
  spaceMap.forEach(function(xAndY) {
    thisBoard.threeInRows[xAndY[0]][xAndY[1]] = playerLetter;
  });
  return true;
};

Board.prototype.checkForWin = function () {
  for (var i = 0; i < this.threeInRows.length; i++) {
    var firstIndex = this.threeInRows[i][0];
    if (
      this.threeInRows[i].every( function(sp) {
        return (sp && (sp === firstIndex))
      }
    )) {
      this.winner = firstIndex;
      return this.winner;
    }
  }
  return false;
};

Board.prototype.changePlayer = function () {
  if (this.currentPlayer === "X") {
    this.currentPlayer = "O";
  } else {
    this.currentPlayer = "X";
  }
  return this.currentPlayer;
};




var board = new Board();
// board.currentPlayer = "X"
// board.selectSpace("spE", board.currentPlayer);
// console.log(board.checkForWin());
// board.changePlayer();
// board.selectSpace("spA", board.currentPlayer);
// console.log(board.checkForWin());
// board.changePlayer();
// board.selectSpace("spD", board.currentPlayer);
// console.log(board.checkForWin());
// board.changePlayer();
// board.selectSpace("spB", board.currentPlayer);
// console.log(board.checkForWin());
// board.changePlayer();
// board.selectSpace("spF", board.currentPlayer);
// console.log(board.checkForWin());
//
//
// console.log(board);


$(document).ready(function() {


});
