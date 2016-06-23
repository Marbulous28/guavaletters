exports.Dictionary = function() {};

exports.Dictionary.prototype.testDict = function() {
  $.get("./../../SOWPODS.txt").then(function(response) {
    var dict = response.split("\n");
    console.log(dict[37]);
  });
};
