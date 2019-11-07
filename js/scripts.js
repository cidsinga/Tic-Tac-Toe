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
  this.currentPlayer = "X";
  this.turnCount = 0;
  this.isTie = false;
}

Board.prototype.selectSpace = function (spaceId, playerLetter) {
  var spaceMap = this.spaces[spaceId];
  this.turnCount += 1;
  var thisBoard = this;
  spaceMap.forEach(function(xAndY) {
    thisBoard.threeInRows[xAndY[0]][xAndY[1]] = playerLetter;
  });
  var isWin = board.checkForWin();
  if (!isWin) {
    if (this.turnCount === 9) {
      this.isTie = true;
    } else {
      this.changePlayer();
    }
  }
  return isWin;
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


$(document).ready(function() {

  function placeToken(divToMark, playerToMark){
    var random = Math.floor(Math.random() * 4) +1
    $(divToMark).text('');
    var newImg = `<img src="img/${playerToMark}${random}.png" alt="Empty Space">`
    $(divToMark).append(newImg);
    $(divToMark).removeClass("playable");
  }

  $(".board").on("click", ".playable", function() {
    placeToken(this, board.currentPlayer);
    var isWin = board.selectSpace(this.id, board.currentPlayer);
    $(".currentPlayer").text(board.currentPlayer);
    if (isWin) {
      $(".winner-modal").modal("show");
      $("#restart").show();
      $("#turn").hide();
    };
    if (board.isTie) {
      $(".tie-modal").modal("show");
      $("#restart").show();
      $("#turn").hide();
    }
  })

  $("#startOver").click(function() {
    location.reload();
  })

});
