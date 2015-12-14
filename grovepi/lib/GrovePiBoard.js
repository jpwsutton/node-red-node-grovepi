var GrovePi = require('node-grovepi').GrovePi;

var STATE_UNINITIALISED = 0;
var STATE_INITIALISED   = 1;

 var GrovePiBoard = function() {
   console.log('GrovePiBoard.js: Constructor');
   this.state = this.state || STATE_UNINITIALISED;
   console.log('GrovePiBoard.js: State: ' + this.state);
   if(this.state == STATE_UNINITIALISED){
     this.board = this.init.apply(this);
     this.commands = GrovePi.commands;
     this.state = STATE_INITIALISED;
   }
   console.log('GrovePiBoard.js: Init Complete');
   console.log(this.board);

 };

 GrovePiBoard.prototype.init = function() {
   console.log('GrovePiBoard.js: Init Function');
   var board = new GrovePi.board({
     debug: true,
     onError: function(err){
       console.log('GrovePiBoard.js: Something went wrong');
       console.log(err)
     },
     onInit: function(res) {
       console.log('GrovePiBoard.js: GrovePi onInit');
       if(res){
         console.log('GrovePiBoard.js: GrovePi Version :: ' + board.version());

         // Get & init Digital inputs

         // Get & init Outputs
       } else {
         console.log('GrovePiBoard.js: No Res');
       }
     }
   });
   board.init();
   return board;
 };

 GrovePiBoard.prototype.registerSensor = function(sensorType, pin, repeat, callback){
   if(sensorType == 'analog'){
   var self = this;
   var interval =  setInterval( function(){
       console.log('GrovePiBoard.js: Checking Sensor');
       var value = self.readAnalogSensor.apply(self,[pin] );
       callback(value);
     }, repeat * 1000);

     return function(callback){
       clearInterval(interval);
       calllback();
     }
   }
 };

 GrovePiBoard.prototype.readAnalogSensor = function(pin, length){
   if(typeof length == 'undefined'){
     length - this.board.BYTESLEN;
   }
   var writeRet = this.board.writeBytes(this.commands.aRead.concat([pin, this.commands.unused, this.commands.unused]));
   if(writeRet){
     this.board.readByte();
     var bytes = this.board.readBytes(length);
     if(bytes instanceof Buffer) {
       return bytes[1] * 256 + bytes[2]
     } else {
       return false;
     }
   } else {
     return false;
   }
 };



module.exports = GrovePiBoard;
