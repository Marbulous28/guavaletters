var NannerLogic = require("./../js/nannerlogic.js").NannerLogic;
var clickedTile = null;

$(document).ready(function(){
  $('#run').click(function(){
    var nannerLogic = new NannerLogic();
    $('.gameBoard').show();
    $('#run').hide();
    var newHand = nannerLogic.dealHand();
    for(var j = 0; j < 21; j++){
      $('#handLetter'+j).html(newHand[j]);
    }

    $('.gameTile').click(function(){
      if(clickedTile === null && $(this).children().first().html() !== ""){
        clickedTile = $(this).children().first().html();
        $(this).children().first().empty();
      } else if (clickedTile !== null && $(this).children().first().html() === ""){
        $(this).children().first().html(clickedTile);
        clickedTile = null;
      }
    });

    var testArrayRows = nannerLogic.checkArrayRows();
    var testArrayCols = nannerLogic.columnsToRows();
    for(var i = 0; i < testArrayRows.length; i++){
      var enteredWord = testArrayRows[i];
      var api = 'http://api.pearson.com/v2/dictionaries/entries?headword=' + enteredWord;
      $.get(api, function(response){
        if(response.results.length !== 0){
        } else{
        }
      });
    }
  });
});
