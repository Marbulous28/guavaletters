var BoardMaker = require("./../js/boardMaker.js").BoardMaker;
var Dictionary = require("./../js/dictionary.js").Dictionary;
var dictionary = new Dictionary();
$(document).ready(function() {
  var boardMaker = new BoardMaker();
  boardMaker.makeBoard();
  dictionary.testDict();
});
