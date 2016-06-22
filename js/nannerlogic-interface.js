var NannerLogic = require("./../js/nannerlogic.js").NannerLogic;
var clickedTile = null;
var dumpCounter = 0;
var testArrayRows = [];
var testArrayCols = [];
var testArrayAll = [];

$(document).ready(function(){
  $('#run').click(function(){
    var nannerLogic = new NannerLogic();
    $('.gameBoard').slideDown();
    $('.handDisplay').slideDown();
    $('#run').hide();
    var newHand = nannerLogic.dealHand();
    for(var j = 0; j < 31; j++){
      $('#handLetter'+j).html(newHand[j]);
    }


    // DRAG AND DROP LOGIC

    $('.gameTile').draggable({
      snap: '.boardTile',
      snapMode: 'inner',
      revert: 'invalid'
    });

    $('.boardTile').droppable({
      scroll: true,
      accept: ".gameTile",
      hoverClass: 'drop-hover',
      tolerance: 'fit',
      drop: function(event, ui){
        $(this).text(ui.draggable[0].innerText);
        $(this).droppable('option', 'accept', ui.draggable);
      },
      out: function(event, ui){
        $(this).empty();
        $(this).droppable('option', 'accept', '.gameTile');
      }
    });

    $('.dump').droppable({
      accept: ".gameTile",
      tolerance: "intersect",
      drop: function(event, ui){
        console.log(ui);
        if (dumpCounter < 2) {
          $(ui.draggable).remove();
          dumpCounter++;
        } else if (dumpCounter === 2){
          $(ui.draggable).remove();
          $('.dump').hide();
        }
      }
    });

    $('#submit').click(function(){
      testArrayAll = [];
      testArrayRows = [];
      testArrayCols = [];
      console.log("all:", testArrayAll, "Cols:", testArrayCols, "Rows:", testArrayRows);
      for (var xx=1; xx<=400; xx++){
        nannerLogic.masterRowArray.push($('#' + xx).text());
      }

      for (var yy=1; yy<=20; yy++){
        for (var zz=1; zz<=20; zz++){
          nannerLogic.masterColArray.push($('.row'+ zz + ' .col' + yy).text());
        }
      }
      testArrayRows = nannerLogic.checkArrayRows();
      testArrayCols = nannerLogic.columnsToRows();
      testArrayAll = testArrayRows.concat(testArrayCols);
      var enteredWord = '';
      console.log(testArrayAll);
      for(var i = 0; i < testArrayAll.length; i++){
        // console.log(testArrayAll[i], 'testArray');
        var notWordArray = [];
        if(testArrayAll[i].length > 1){
          enteredWord = testArrayAll[i];
          // console.log('word:', enteredWord);
          var api = 'http://api.pearson.com/v2/dictionaries/entries?headword=' + enteredWord;
          $.get(api).then(function(response){
            // console.log(api, enteredWord, i, testArrayAll);
            if(response.results.length !== 0){
              console.log(response, 'nice job')
            } else if (response.total === 0) {
              notWordArray.push(enteredWord);
              console.log(enteredWord, notWordArray);
            }
          });
        }
      }
    });
  });
});
