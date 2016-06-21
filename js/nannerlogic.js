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
  return this.ryansArray;
  this.ryansArray=[];
};

exports.NannerLogic.prototype.columnsToRows = function () {

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
  return this.petersArray;
  this.petersArray=[];
};

exports.NannerLogic.prototype.dealHand = function(){
  var handArray = [];
  var number;
  var letterArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  for(var i = 0; i < 21; i++){
    number = Math.floor((Math.random() * 25) + 1);
    handArray.push(letterArray[number]);
  }
  return handArray;
};
