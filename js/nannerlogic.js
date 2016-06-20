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
console.log(ryansArray);
}

exports.NannerLogic.prototype.dealHand = function(){
  var handArray = [];
  var number;
  var letterArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  for(var i = 0; i < 21; i++){
    number = Math.floor((Math.random() * 25) + 1);
    handArray.push(letterArray[number]);
    console.log(handArray[20]);
  }
  return handArray;
}
