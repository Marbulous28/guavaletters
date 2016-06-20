var NannerLogic = require("./../js/nannerlogic.js").NannerLogic;

$(document).ready(function(){
  $('#run').click(function(){
    var nannerLogic = new NannerLogic();
    $('.gameBoard').show();
    $('#run').hide();
    var newHand = nannerLogic.dealHand();
    for(var j = 0; j < 21; j++){
      $('#hand'+j).append(newHand[j]);
    }

    // $(".gameTile").click(function(){
    //   $(this).children().first().toggle();
    // });

    var testArray = nannerLogic.checkArray();
    for(var i = 0; i < testArray.length; i++){
      var enteredWord = testArray[i];
      var api = 'http://api.pearson.com/v2/dictionaries/entries?headword=' + enteredWord;
      $.get(api, function(response){
        if(response.results.length !== 0){
        } else{
        }
      });
    }
  });
});
