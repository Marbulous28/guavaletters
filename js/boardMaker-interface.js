var BoardMaker = require("./../js/boardMaker.js").BoardMaker;
// var Dictionary = require("./../js/dictionary.js").Dictionary;
// var dictionary = new Dictionary();
$(document).ready(function() {
  // dictionary.testDict();
  // $("#dictTest").click(function() {
  //   dictionary.search('test');
  // });
  var boardMaker = new BoardMaker();
  boardMaker.makeBoard();
});
