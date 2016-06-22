var moment = require("./../bower_components/moment/moment.js");
// var Clock = require("./../js/clock.js").Clock;

$(document).ready(function() {

  // var allSpansArray = document.querySelectorAll('.insertshitintothisspan');
  // for (var i = 0; i < allSpansArray.length; i++) {
  //   allSpansArray[i].id = (i + 1);
  // }
  // you can ignore me, I was just a bit of code used to give 400 spans unique ids.


  $("#timer").hide();
  var $counter = 0;

  var update = function(htmlElement) {
    var currentTime = moment().minute(10).second($counter--).format('mm : ss');
    htmlElement.text(currentTime);
    if (currentTime === "00 : 00") {
      $(".hard-wrapper").html('<iframe width="420" height="315" src="https://www.youtube.com/embed/M5QGkOGZubQ?autoplay=1" frameborder="0" allowfullscreen></iframe>');
      var video = $(iframe);
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    }
  };
  var updateInterval;

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

});
