var moment = require("./../bower_components/moment/moment.js");
var $counter = 0;
var scoreCounter = 0;
var currentTime = moment().minute(20).second($counter--).format('mm : ss');
var scoreTime = moment().minute(0).second(scoreCounter++).format('mm : ss');
var updateInterval;
var NannerLogic = require("./../js/nannerlogic.js").NannerLogic;
var nannerLogic = new NannerLogic();
var clickedTile = null;
var dumpCounter = 0;
var testArrayRows = [];
var testArrayCols = [];
var testArrayAll = [];
var newLetter;
var firebase = require("firebase/app");
var database = require("firebase/database");
var config = {
  apiKey: "AIzaSyC13jyPWJjDxYQKTelaBALIOs8Ky-g_ggY",
  authDomain: "guavagrams.firebaseapp.com",
  databaseURL: "https://guavagrams.firebaseio.com",
  storageBucket: "guavagrams.appspot.com",
};
firebase.initializeApp(config);

//Add New Score Function
function newScore(scoreName, time) {
  firebase.database().ref('scores/' + scoreName).set({
    name: scoreName,
    score: time
  });
}

$(document).ready(function(){
  //Game Start
  $('#run').click(function(){
  $.playSound('sounds/wow2');
    $('.intro-screen').hide();
    $('.gameBoard').slideDown();
    $('.handDisplay').slideDown();
    $('#run').hide();
    var newHand = nannerLogic.dealHand();
    for(var j = 0; j < 31; j++){
      $('#handLetter'+j).html(newHand[j]);
    }

    //Drag and Drop
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
          newLetter = nannerLogic.letterGenerator();
          $('#handRow4').append("<span id='newTile" + dumpCounter + "' class='gameTile col-xs-1'>" + newLetter + "</span>");
          $('.gameTile').draggable({
            snap: '.boardTile',
            snapMode: 'inner',
            revert: 'invalid'
          });
        } else if (dumpCounter === 2){
          $(ui.draggable).remove();
          newLetter = nannerLogic.letterGenerator();
          $('#handRow4').append("<span id='newTile" + dumpCounter + "' class='gameTile col-xs-1'>" + newLetter + "</span>");
          $('.gameTile').draggable({
            snap: '.boardTile',
            snapMode: 'inner',
            revert: 'invalid'
          });
          $('.dump').hide();
        }
      }
    });
  }); //run

  //Clock
  $("#timer").hide();
  var update = function(htmlElement) {
    currentTime = moment().minute(20).second($counter--).format('mm : ss');
    scoreTime = moment().minute(0).second(scoreCounter++).format('mm : ss');
    htmlElement.text(currentTime);
    if (currentTime === "00 : 00") {
      $(".hard-wrapper").html('<iframe width="420" height="315" src="https://www.youtube.com/embed/M5QGkOGZubQ?autoplay=1" frameborder="0" allowfullscreen></iframe>');
      var video = $(iframe);
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    }
  };
  // <iframe src="//coub.com/embed/409y8?muted=false&autostart=false&originalSize=false&startWithHD=false" allowfullscreen="true" frameborder="0" width="640" height="360"></iframe>
  // this is the win link. enjoy that.
  // var timer = new Clock();
  // timer.counter = 0;
  update($("time"));
  $("#run").click(function() {
    $("#timer").show();
    updateInterval = setInterval(update, 1000, $("time"));
    $("#stop").click(function() {
      clearInterval(updateInterval);
      $("#stop").hide();
      $(".gameBoard").slideUp();
      $(".handDisplay").slideUp();
      $("#start").show();
    });
    $("#start").click(function() {
      updateInterval = setInterval(update, 1000, $("time"));
      $("#stop").show();
      $(".gameBoard").slideDown();
      $(".handDisplay").slideDown();
      $("#start").hide();
    });
  });

  // Submit Board
  $('#submit').click(function(){
    testArrayAll = [];
    testArrayRows = [];
    testArrayCols = [];
    var notWordArray = [];
    for (var xx=1; xx<=400; xx++){
      nannerLogic.masterRowArray.push($('#' + xx).text());
    }

    for (var yy=1; yy<=20; yy++){
      for (var zz=1; zz<=20; zz++){
        nannerLogic.masterColArray.push($('.row'+ zz + ' .col' + yy).text());
      }
    }
    var lettersConnected = nannerLogic.lettersConnected();
    testArrayRows = nannerLogic.checkArrayRows();
    testArrayCols = nannerLogic.columnsToRows();
    var lettersUsed = nannerLogic.checkLetters(testArrayCols);
    testArrayAll = testArrayRows.concat(testArrayCols);
    var enteredWord = '';

    if (lettersConnected && lettersUsed) {
      $.get("./../../SOWPODS.txt").then(function(response) {
        var dict = response.split("\n");
        for(var i = 0; i < testArrayAll.length; i++){
          if(testArrayAll[i].length > 1){
            enteredWord = testArrayAll[i];
            if( dict.indexOf(enteredWord) !== -1 ){
              console.log(enteredWord + ' is a real word. nice job!');
            } else {
              notWordArray.push(enteredWord);
              console.log(enteredWord, notWordArray);
            }
          }
        }
      });
      if (notWordArray.isEmpty()) { 
        clearInterval(updateInterval);
        $('#finalTime').append(scoreTime);
        $('.gameBoard').slideUp();
        $('.handDisplay').slideUp();
        $("#timer").slideUp();
        $('#end-screen').slideDown();
        // win condition
      }
    } else {
      console.log("please use all letters and make sure your words are all connected.");
      // replace this with an actual alert screen.
    }

    // $('#highScoreForm').submit(function(event){
    //   event.preventDefault();
    //   var newName = $("#scoreName").val();
    //   newScore(newName, scoreTime);
    //   $("#scoreName").val("");
    //   var thing = firebase.database().ref('scores');
    //   console.log(thing);
    //   });
    });

}); //ready
