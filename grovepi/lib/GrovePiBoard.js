var GrovePi = require('node-grovepi').GrovePi;



 var GrovePiBoard = function() {
   console.log('GrovePiBoard.js: Constructor');
   this.results = this.init.apply(this);
   console.log('GrovePiBoard.js: Init Complete');
   console.log(this.results);

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
