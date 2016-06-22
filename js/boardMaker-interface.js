function dynamicAppend(element, index, array) {
  for (var x = 1; x <= 20; x ++) {
    $(element).append(
      '<span id="' + (index*20 + x) + '" class="col-xs-1 boardTile col' + x + '"></span>'
    );
  }
}

function boardMaker() {
  for (var i = 0; i < 20; i++) {
    $(".gameBoard").append(
      '<div class="row row' + (i+1) + '"></div>'
    );
  }
  var rowArray = $(".gameBoard .row").toArray();
  rowArray.forEach(dynamicAppend);
}




$(document).ready(function() {
  boardMaker();
});
