exports.NannerLogic = function() {
  this.nannerArray = [null, null, null, "h", "i","t", null,"i", "t", null, "t","o","p", null, null, "h","o","w",null];
  this.wordArray = [];
  this.ryansArray = [];
  this.nullSwitch = false;
};

exports.NannerLogic.prototype.checkArray = function ( ) {

    for(var i = 0; i < this.nannerArray.length; i++){
      if(this.nannerArray[i] !== null && this.nullSwitch == true){
        this.wordArray.push(this.nannerArray[i]);
        this.nullSwitch = false;
      } else if (this.nannerArray[i] !== null){
        this.wordArray.push(this.nannerArray[i]);
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
