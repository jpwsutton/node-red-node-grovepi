var GrovePi = require('node-grovepi').GrovePi;
var STATE_UNINITIALISED = 0;
var STATE_INITIALISED = 1;

var state = STATE_UNINITIALISED;


 var GrovePiBoard = function() {
   console.log('Initialising GrovePiBoard');
   this.commands = GrovePi.commands;
   this.analogSensors = [];

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
         var analogArray = [];

         // Get & init Analog inputs
         for (var i = 0; i < this.analogSensors.length; i++) {
           console.log('New Analog Sensor');
           console.log(this.analogSensors[i]);
           var aSensor = new GrovePi.sensors.Analog(this.analogSensors[i].pin);
           //Do something
           aSensor.stream(repeat, this.analogSensors[i].callback);
         }

         // Get & init Digital inputs

         // Get & init Outputs
       } else {
         console.log('GrovePiBoard.js: No Res');
       }
     }
   });
   console.log('GrovePiBoard.js: Calling init');
   board.init();
 };

 GrovePiBoard.prototype.registerSensor = function(sensorType, pin, repeat, callback){
   var sensor = new Sensor(sensorType, pin, repeat, callback);
   this.analogSensors.push(sensor);
   return sensor;
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
