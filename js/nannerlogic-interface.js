var Nannerlogic = require("./../js/nannerlogic.js").Nannerlogic;

$(document).ready(function(){
  var nannerLogic = new Nannerlogic();
  debugger
  $('#run').click(function(){
    var testArray = nannerLogic.checkArray();
    for(var i = 0; i < testArray.length; i++){
      var enteredWord = testArray[i];
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
