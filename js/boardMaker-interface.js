var BoardMaker = require("./../js/boardMaker.js").BoardMaker;
$(document).ready(function() {
  var boardMaker = new BoardMaker();
  boardMaker.makeBoard();
});
