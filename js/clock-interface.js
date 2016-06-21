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
    }
  }
  var updateInterval;


  // var timer = new Clock();
  // timer.counter = 0;
  update($("time"));
  $("#run").one("click", function() {
    $("#timer").show();
    updateInterval = setInterval(update, 1000, $("time"));
    $("#stop").one("click", function() {
      clearInterval(updateInterval);
      // add another start listener.
      // $("#start").one("click", function() {
      //   updateInterval = setInterval(update, 1000, $("time"));
      // });
    });
  });

});
