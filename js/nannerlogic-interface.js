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

    $('#submit').click(function(){

      for (var xx=1; xx<=400; xx++){
        nannerLogic.masterRowArray.push($('#' + xx).text());
      }

      for (var yy=1; yy<=20; yy++){
        for (var zz=1; zz<=20; zz++){
          nannerLogic.masterColArray.push($('.row'+ zz + ' .col' + yy).text());
        }
      }

      var testArrayRows = nannerLogic.checkArrayRows();
      var testArrayCols = nannerLogic.columnsToRows();
      var testArrayAll = testArrayRows.concat(testArrayCols);
      for(var i = 0; i < testArrayAll.length; i++){
        var enteredWord = testArrayAll[i];
        var api = 'http://api.pearson.com/v2/dictionaries/entries?headword=' + enteredWord;
        if(enteredWord.length > 1){
          $.get(api).then(function(response){
            if(response.results.length !== 0){
              console.log(response.results, 'nice effing job')
            } else{
            }
          });
        }
      }
    });
  });
});
