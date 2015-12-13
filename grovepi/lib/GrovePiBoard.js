var GrovePi = require('node-grovepi').GrovePi;
var STATE_UNINITIALISED = 0;
var STATE_INITIALISED = 1;

var state = STATE_UNINITIALISED;


 var GrovePiBoard = function() {
   console.log('Initialising GrovePiBoard');
   this.commands = GrovePi.commands;

 };

 GrovePiBoard.prototype.isInitialised = function(){
    if(state === STATE_INITIALISED){
      return true;
    } else {
      return false;
    }
 }

 GrovePiBoard.prototype.init = function() {
   console.log('GrovePiBoard.js: Starting init');
   this.board = new GrovePi.board({
     debug: true,
     onError: function(err){
       console.log('GrovePiBoard.js: Something went wrong');
       console.log(err)
     },
     onInit: function(res) {
       console.log('GrovePiBoard.js: GrovePi onInit');
       if(res){
         console.log('GrovePiBoard.js: GrovePi Version :: ' + this.board.version());

         // Get & init Analog inputs

         // Get & init Digital inputs

         // Get & init Outputs
       } else {
         console.log('GrovePiBoard.js: No Res');
       }
     }
   });
   console.log('GrovePiBoard.js: Calling init');
   this.board.init();
 };

 GrovePiBoard.prototype.registerSensor = function(sensorType, pin, repeat, callback){
   var sensor = new Sensor(sensorType, pin, repeat, callback);
   return sensor;
 }



module.exports = GrovePiBoard;


var Sensor = function(type, pin, repeat, callback) {
    if(type == 'analog'){
    this.testTimer = setInterval(function(){
                        callback('Analog Pin: ' + pin + ' says hello.');
                    }, repeat * 1000);
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
