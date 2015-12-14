var GrovePi = require('node-grovepi').GrovePi;

var STATE_UNINITIALISED = 0;
var STATE_INITIALISED   = 1;

 var GrovePiBoard = function() {
   console.log('GrovePiBoard.js: Constructor');
   this.state = this.state || STATE_UNINITIALISED;
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
       console.error('GrovePiBoard.js: Something went wrong');
       console.error(err)
     },
     onInit: function(res) {
       console.log('GrovePiBoard.js: GrovePi onInit');
       if(res){
         console.log('GrovePiBoard.js: GrovePi Version :: ' + board.version());
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
       var value = self.readAnalogSensor.apply(self,[pin] );
       callback(value);
     }, repeat * 1000);

     return function(callback){
       clearInterval(interval);
       calllback();
     }
   } else if(sensorType == 'digital'){
     var self = this;
     var interval = setInterval(function(){
       var value = self.readDHTSensor.apply(self, [pin]);
       callback(value);
     }, repeat *1000);
     return function(callback){
       clearInterval(interval);
       calllback();
     }

   }
 };

 GrovePiBoard.prototype.readDHTSensor = function(pin){
   var dhtSensor = new DHTDigitalSensor(pin);
   var reading = dhtSensor.read();
   return reading;
 };

 GrovePiBoard.prototype.input = function(pin, state){
   this.board.writeBytes(this.commands.dWrite.concat([pin, state, this.commands.unused]));
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
