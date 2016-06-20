var moment = require("./../bower_components/moment/moment.js");
// var Clock = require("./../js/clock.js").Clock;

$(document).ready(function() {
  var $counter = 0;

  var update = function(htmlElement) {
    var currentTime = moment().hour(1).minute(0).second($counter--).format('HH : mm : ss');
    htmlElement.text(currentTime);
  }

  // var timer = new Clock();
  // timer.counter = 0;
  update($("time"));
  $("#start").click( function() {
    setInterval(update, 1000, $("time"));
  });
});
