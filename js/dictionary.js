exports.Dictionary = function() {
  // this.dict = $.get("./../../SOWPODS.txt").then(function(response) {
  //   return response.split("\n");
  // });
};

exports.Dictionary.prototype.testDict = function() {
  $.get("./../../SOWPODS.txt").then(function(response) {
    var dict = response.split("\n");
    console.log(dict[37]);
  });
};

exports.Dictionary.prototype.search = function(input) {
  var word = input.toUpperCase();
  $.get("./../../SOWPODS.txt").then(function(response) {
    var dict = response.split("\n");
    console.log(dict.indexOf(word) !== -1 ? true : false);
  });

  // var word = input.toUpperCase();
  // var isItThere = this.dict.indexOf(word) !== (-1) ? true : false ;
  // console.log(isItThere);
  // return isItThere;
}
