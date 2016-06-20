var nannerArray = [null, null, null, "h", "i", null, null, "t","o", null];
var wordArray = [];
var nullSwitch = false;

function checkArray(){
  for(var i = 0; i < nannerArray.length; i++){
    if(nannerArray[i] !== null && nullSwitch == true){
      wordArray.push(' ', nannerArray[i]);
      nullSwitch = false;
    } else if (nannerArray[i] !== null){
      wordArray.push(nannerArray[i]);
    } else {
      nullSwitch = true;
    }

  };
  var joinedArray = wordArray.join("")
  return joinedArray;
};

$(document).ready(function(){
  console.log(nannerArray);

  $("#run").click(function(){
    console.log(checkArray(), nullSwitch);
  })
})
