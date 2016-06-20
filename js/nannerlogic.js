var nannerArray = [null, null, null, "h", "i","t", null,"i", "t", null, "t","o","p", null, null, "h","o","w",null];
var wordArray = [];
var ryansArray = [];
var nullSwitch = false;

function checkArray(){
  for(var i = 0; i < nannerArray.length; i++){
    if(nannerArray[i] !== null && nullSwitch == true){
      wordArray.push(nannerArray[i]);
      nullSwitch = false;
    } else if (nannerArray[i] !== null){
      wordArray.push(nannerArray[i]);
    } else {
      if(wordArray.length === 0){
        nullSwitch = true;
      } else {
        ryansArray.push(wordArray.join(''));
        wordArray = [];
      }
    }
  };
  return ryansArray;
};

$(document).ready(function(){

  $('#run').click(function(){
    var testArray = ['dog', 'cat', 'blrrg', 'biscuit', 'russia', 'panic'];
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
