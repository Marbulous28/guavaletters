exports.NannerLogic = function() {
  this.masterRowArray = [];
  this.masterColArray = [];
  this.wordArray = [];
  this.wordArray1 = [];
  this.ryansArray = [];
  this.petersArray = [];
  this.nullSwitch = false;
  this.nullSwitch1 = false;
};

exports.NannerLogic.prototype.checkArrayRows = function () {
  this.ryansArray = [];
  for(var i = 0; i < this.masterRowArray.length; i++){
    if(this.masterRowArray[i] !== '' && this.nullSwitch === true){
      this.wordArray.push(this.masterRowArray[i]);
      this.nullSwitch = false;
    } else if (this.masterRowArray[i] !== ''){
      this.wordArray.push(this.masterRowArray[i]);
    } else {
      if(this.wordArray.length === 0){
        this.nullSwitch = true;
      } else {
        this.ryansArray.push(this.wordArray.join(''));
        this.wordArray = [];
      }
    }
  }
  this.masterRowArray = [];
  return this.ryansArray;
};

exports.NannerLogic.prototype.columnsToRows = function () {
  this.petersArray = [];
  for(var ii = 0; ii < this.masterColArray.length; ii++){
    if(this.masterColArray[ii] !== '' && this.nullSwitch1 === true){
      this.wordArray1.push(this.masterColArray[ii]);
      this.nullSwitch1 = false;
    } else if (this.masterColArray[ii] !== ''){
      this.wordArray1.push(this.masterColArray[ii]);
    } else {
      if(this.wordArray1.length === 0){
        this.nullSwitch1 = true;
      } else {
        this.petersArray.push(this.wordArray1.join(''));
        this.wordArray1 = [];
      }
    }
  }
  this.masterColArray = [];
  return this.petersArray;
};

// function for generating the player's hand
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


// Checks that all the letters were used
exports.NannerLogic.prototype.checkLetters = function(testArrayCols) {
  var word = "";
  var letters;
  var lettersList = [];
  for (var i = 0; i < testArrayCols.length; i ++) {
    word = testArrayCols[i];
    letters = word.split("");
    for (var ii = 0; ii < letters.length; ii++) {
      lettersList.push(letters[ii]);
    }
  }
  if (lettersList.length === 30) {
    return true;
  } else {
    return false;
  }
};

// Checks if letters are connected
exports.NannerLogic.prototype.lettersConnected = function() {
  for (var i = 0; i < this.masterRowArray.length; i ++) {
    if (this.masterRowArray[i] === "") {
      console.log("empty");
    } else if (this.masterRowArray[i] !== "" && (this.masterRowArray[(i - 1)] !== "" || this.masterRowArray[(i + 1)] !== "" || this.masterRowArray[(i - 20)] !== "" || this.masterRowArray[i + 20] !== "")){
      console.log("good");
    } else {
      return false;
    }
  }
  return true;
};

// RNG function
exports.NannerLogic.prototype.RNG = function(max) {
  return Math.floor((Math.random() * max) + 1);
};

//RNG for generating hand
exports.NannerLogic.prototype.letterGenerator = function() {

  var roll = this.RNG(110);
  var roll2 = 0;
  var letterChoice = "";
  var secondLetters = ["Z", "X", "Q", "K", "J"];
  var firstLetters = ["Y", "W", "V", "P", "M", "H", "F", "B", "C"];
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

  } else if (roll > 79 && roll <= 100) {
    roll2 = (this.RNG(3) - 1);
    letterChoice = fifthLetters[roll2];

  } else {
    letterChoice = "E";
  }
  return letterChoice;
};
