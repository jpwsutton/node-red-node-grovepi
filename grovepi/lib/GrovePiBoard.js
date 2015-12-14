var GrovePi = require('node-grovepi').GrovePi;

var STATE_UNINITIALISED = 0;
var STATE_INITIALISED   = 1;

 var GrovePiBoard = function() {
   console.log('GrovePiBoard.js: Constructor');
   this.state = this.state || STATE_UNINITIALISED;
   this.analogSensors = this.analogSensors || [];
   console.log('GrovePiBoard.js: State: ' + this.state);
   if(this.state == STATE_UNINITIALISED){
     this.board = this.init.apply(this);
     this.commands = GrovePi.Commands;
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
   var sensor = new Sensor(sensorType, pin, repeat, callback);
   if(sensorType == 'analog'){
    var interval =  setInterval( function(){
       var value = this.readAnalogSensor.apply(this, pin, null);
     }, repeat);

   }
   this.analogSensors.push(sensor);
   return sensor;
 }

 GrovePiBoard.prototype.readAnalogSensor = function(pin, length){
   if(typeof length = 'undefined'){
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
 }



module.exports = GrovePiBoard;


var Sensor = function(type, pin, repeat, callback) {
  this.pin = pin;
  this.repeat = repeat;
  this.callback = callback;
    if(type == 'analog'){

    } else if(type == 'digital'){

    }
};

Sensor.prototype.unregister = function(callback){
    clearInterval(this.testTimer);
    callback();
};

 // var Commands = GrovePi.commands;
 // var Board = GrovePi.board;
 // var LightAnalogSensor = GrovePi.sensors.LightAnalog;
 //
 // var board = new Board({
 //   debug: true,
 //   onError: function(err){
 //     console.log('GrovePiLightSensorNode: Something went wrong');
 //     console.log(err);
 //   },
 //   onInit: function(res) {
 //     if(res) {
 //       var lightSensor = new LightAnalogSensor(2);
 //       console.log('Light Analog Sensor (start watch)');
 //       lightSensor.on('change', function(res) {
 //         console.log('Light onChange value=' + res);
 //         var msg = {};
 //         msg.payload = res;
 //         node.send(msg);
 //       })
 //     }
 //   }
 // });
 // board.init();
