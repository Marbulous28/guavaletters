var NannerLogic = require("./../js/nannerlogic.js").NannerLogic;

$(document).ready(function(){
  var nannerLogic = new NannerLogic();
  $('#run').click(function(){
    var testArrayRows = nannerLogic.checkArrayRows();
    var testArrayCols = nannerLogic.columnsToRows();
    console.log(testArrayCols);
    for(var i = 0; i < testArrayRows.length; i++){
      var enteredWord = testArrayRows[i];
      var api = 'http://api.pearson.com/v2/dictionaries/entries?headword=' + enteredWord;
      $.get(api, function(response){
        if(response.results.length !== 0){
          console.log(response.results);
        } else{
          console.log(response.results);
        }
      });
    }
  });
});
