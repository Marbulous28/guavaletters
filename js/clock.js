// var moment = require("./../bower_components/moment/moment.js");
// exports.Clock = function() {
//   this.counter = 1;
// };
//
// exports.Clock.prototype.update = function (htmlElement) {
//   this.counter--;
//   var currentTime = moment().hour(1).minute(0).second(this.counter).format("HH : mm : ss");
//   htmlElement.text(currentTime);
// };

/*
var moment = require("./../bower_components/moment/moment.js");
var $counter = 0;

var update = function(htmlElement) {
  var currentTime = moment().hour(1).minute(0).second($counter--).format('HH : mm : ss');
  htmlElement.text(currentTime);
}

$(document).ready(function() {
  update($("time"));
  $("#start").click( function() {
    setInterval(update, 1000, $("time"));
  });
});
*/
