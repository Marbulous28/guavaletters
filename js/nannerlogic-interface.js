var NannerLogic = require("./../js/nannerlogic.js").NannerLogic;
var clickedTile = null;
var dumpCounter = 0;
var testArrayRows = [];
var testArrayCols = [];
var testArrayAll = [];
var firebase = require("firebase/app");
var database = require("firebase/database");
var config = {
  apiKey: "AIzaSyC13jyPWJjDxYQKTelaBALIOs8Ky-g_ggY",
  authDomain: "guavagrams.firebaseapp.com",
  databaseURL: "https://guavagrams.firebaseio.com",
  storageBucket: "guavagrams.appspot.com",
};
firebase.initializeApp(config);
function writeUserData() {
  firebase.database().ref('scores/1').set({
    name: "balls",
    score: 90
  });
}


$(document).ready(function(){
  $('#run').click(function(){
  $.playSound('sounds/wow');
    $('.intro-screen').hide();
    var nannerLogic = new NannerLogic();
    $('.gameBoard').slideDown();
    $('.handDisplay').slideDown();
    $('#run').hide();
    var newHand = nannerLogic.dealHand();
    for(var j = 0; j < 31; j++){
      $('#handLetter'+j).html(newHand[j]);
    }

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
        $.playSound('sounds/snap');
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
          var newLetter = nannerLogic.letterGenerator();
          $('#handRow4').append("<span id='newTile" + dumpCounter + "' class='gameTile col-xs-1'>" + newLetter + "</span>");
          $('.gameTile').draggable({
            snap: '.boardTile',
            snapMode: 'inner',
            revert: 'invalid'
          });
        } else if (dumpCounter === 2){
          $(ui.draggable).remove();
          var newLetter = nannerLogic.letterGenerator();
          $('#handRow4').append("<span id='newTile" + dumpCounter + "' class='gameTile col-xs-1'>" + newLetter + "</span>");
          $('.gameTile').draggable({
            snap: '.boardTile',
            snapMode: 'inner',
            revert: 'invalid'
          });
          $('.dump').hide()
        }
      }
    });

    $('#submit').click(function(){
      testArrayAll = [];
      testArrayRows = [];
      testArrayCols = [];
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
        var notWordArray = [];
        if(testArrayAll[i].length > 1){
          enteredWord = testArrayAll[i];
          var api = 'http://api.pearson.com/v2/dictionaries/entries?headword=' + enteredWord;
          $.get(api).then(function(response){
            if(response.results.length !== 0){
              console.log(response, 'nice job')
              $('gameBoard').hide();
              $('#end-screen').show();
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
