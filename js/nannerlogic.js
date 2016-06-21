exports.NannerLogic = function() {
  this.rowArray1 = ['1', '3', null, "h", "b","t", null, "h","o","w",null];
  this.rowArray2 = ['2', '4', "s","h","u","r",null,null,"u","p",null];
  this.rowArray3 = ['5','6',"f","r","t","h","l","j","m","l",null];
  this.masterArray = [this.rowArray1, this.rowArray2, this.rowArray3];
  this.wordArray = [];
  this.ryansArray = [];
  this.nullSwitch = false;
  this.columnArray = []
};

exports.NannerLogic.prototype.checkArrayRows = function () {
  for(var x = 0; x < this.masterArray.length; x ++){
    for(var i = 0; i < this.masterArray[x].length; i++){
      if(this.masterArray[x][i] !== null && this.nullSwitch == true){
        this.wordArray.push(this.masterArray[x][i]);
        this.nullSwitch = false;
      } else if (this.masterArray[x][i] !== null){
        this.wordArray.push(this.masterArray[x][i]);
      } else {
        if(this.wordArray.length === 0){
          this.nullSwitch = true;
        } else {
          this.ryansArray.push(this.wordArray.join(''));
          this.wordArray = [];
        }
      }
    };
  };
  return this.ryansArray;
}

exports.NannerLogic.prototype.columnsToRows = function () {
  for (var i = 0; i < 11; i++) {
    for (var x = 0; x < this.masterArray.length; x++) {
      this.columnArray.push(this.masterArray[x][i]);
    }
  }
return this.columnArray;


for(var i = 0; i < this.columnArray.length; i++){
  if(this.columnArray[i] !== null && this.nullSwitch == true){
    this.wordArray.push(this.columnArray[i]);
    this.nullSwitch = false;
  } else if (this.columnArray[i] !== null){
    this.wordArray.push(this.columnArray[i]);
  } else {
    if(this.wordArray.length === 0){
      this.nullSwitch = true;
    } else {
      this.ryansArray.push(this.wordArray.join(''));
      this.wordArray = [];
    }
  }
};
return this.ryansArray;
}

exports.NannerLogic.prototype.dealHand = function(){
  var handArray = [];
  var handNumber = 30;
  var letterChoice = "";

  for(var i = 0; i < handNumber; i ++){
    letterChoice = this.letterGenerator();
    handArray.push(letterChoice);
  }
  return handArray;
};

exports.NannerLogic.prototype.RNG = function(max) {
  return Math.floor((Math.random() * max) + 1);
};

exports.NannerLogic.prototype.letterGenerator = function() {

  var roll = this.RNG(133);
  console.log(roll, "roll1");

  var roll2 = 0;
  var letterChoice = "";
  var firstLetters = ["Y", "W", "V", "P", "M", "H", "F", "B", "C"];
  var secondLetters = ["Z", "X", "Q", "K", "J"];
  var thirdLetters = ["U", "S", "D", "L"];
  var fourthLetters = ["T", "R"];
  var fifthLetters = ["O", "I", "A"];

  if (roll <= 10) {
    roll2 = (this.RNG(5) - 1);
    letterChoice = secondLetters[roll2];

  } else if (roll > 10 && roll <= 37) {
    roll2 = (this.RNG(9) - 1);
    letterChoice = firstLetters[roll2];

  } else if (roll > 37 && roll <= 61) {
    roll2 = (this.RNG(4) - 1);
    letterChoice = thirdLetters[roll2];

  } else if (roll > 61 && roll <= 79) {
    roll2 = (this.RNG(2) - 1);
    letterChoice = fourthLetters[roll2];

  } else if (roll > 79 && roll <= 115) {
    roll2 = (this.RNG(3) - 1);
    letterChoice = fifthLetters[roll2];

  } else {
    letterChoice = "E";
  }
  console.log(roll2, "roll2")
  console.log(letterChoice);
  return letterChoice;
}
