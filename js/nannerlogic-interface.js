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
        if (dumpCounter < 2) {
          $(ui.draggable).addClass('invisible');
          dumpCounter++;
          newLetter = nannerLogic.letterGenerator();
          $('#handRow4').append("<span id='newTile" + dumpCounter + "' class='gameTile col-xs-1'>" + newLetter + "</span>");
          $('.gameTile').draggable({
            snap: '.boardTile',
            snapMode: 'inner',
            revert: 'invalid'
          });
        } else if (dumpCounter === 2){
          $(ui.draggable).addClass('invisible');
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
    currentTime = moment().minute(6).second($counter--).format('mm : ss');
    scoreTime = moment().minute(0).second(scoreCounter++).format('mm : ss');
    htmlElement.text(currentTime);
    if (currentTime === "00 : 00") {
      $(".hard-wrapper").html('<h3 id="title">YOU LOSE.</h3><iframe width="420" height="315" src="https://www.youtube.com/embed/M5QGkOGZubQ?autoplay=1" frameborder="0" allowfullscreen></iframe>');
      var video = $(iframe);
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    }
  };
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
            } else {
              notWordArray.push(enteredWord);
            }
          }
        }
      });
      if (notWordArray.length === 0) {
        clearInterval(updateInterval);
        $('#finalTime').append(scoreTime);
        $('.gameBoard').slideUp();
        $('.handDisplay').slideUp();
        $("#timer").slideUp();
        $("#end-screen").append('<iframe src="//coub.com/embed/409y8?muted=false&autostart=true&originalSize=false&startWithHD=true" allowfullscreen="true" frameborder="0" width="640" height="360"></iframe>');
        $('#end-screen').slideDown();
        // win condition
      } else {
        alert('Sorry, one of your entries isn\'t a word!');
      }
    } else {
      alert("You must use all of your letters make sure your words are all connected.");
    }
  });
}); //ready
