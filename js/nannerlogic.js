exports.NannerLogic = function() {
  // this.row1 = [null, null, null, null, null, null, null, null, null, null];
  // this.row2 = [null, null, null, null, null, null, null, null, null, null];
  // this.row3 = [null, null, null, null, null, null, null, null, null, null];
  // this.row4 = [null, null, null, null, null, null, null, null, null, null];
  // this.row5 = [null, null, null, null, null, null, null, null, null, null];
  // this.row6 = [null, null, null, null, null, null, null, null, null, null];
  // this.row7 = [null, null, null, null, null, null, null, null, null, null];
  // this.row8 = [null, null, null, null, null, null, null, null, null, null];
  // this.row9 = [null, null, null, null, null, null, null, null, null, null];
  // this.row10 = [null, null, null, null, null, null, null, null, null, null];
  this.boardArray = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', '11', 'r12', 'r13', 'r14', 'r15', 'r16', 'r17', 'r18',
                      '19', '20', '21'];
  this.masterArray = [];
  this.wordArray = [];
  this.ryansArray = [];
  this.columnArray = [];
  this.nullSwitch = false;
};

exports.NannerLogic.prototype.checkArrayRows = function () {

  // console.log(this.masterArray);
  for(var x = 0; x < this.masterArray.length; x ++){
    for(var i = 0; i < this.masterArray[x].length; i++){
      if(this.masterArray[x][i] !== null && this.nullSwitch === true){
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
    }
  }
  return this.ryansArray;
};

exports.NannerLogic.prototype.columnsToRows = function () {
  for (var i = 0; i < 21; i++) {
    for (var x = 0; x < 21; x+=2) {
      this.columnArray.push(this.masterArray[parseInt(x.toString()+i.toString())]);
      console.log(this.masterArray[parseInt(x.toString()+i.toString())]);
    }
  }

for(var ii = 0; ii < this.columnArray.length; ii++){
  if(this.columnArray[ii] !== null && this.nullSwitch === true){
    this.wordArray.push(this.columnArray[ii]);
    this.nullSwitch = false;
  } else if (this.columnArray[ii] !== null){
    this.wordArray.push(this.columnArray[ii]);
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
