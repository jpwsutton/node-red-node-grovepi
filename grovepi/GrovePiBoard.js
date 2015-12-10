//var GrovePi = require('node-grovepi').GrovePi;

 var GrovePiBoard = function() {
   console.log('Initialising GrovePiBoard');



 };

 GrovePiBoard.prototype.init = function() {
   console.log('GrovePiBoard: init called');
 };

 GrovePiBoard.prototype.registerSensor = function(sensorType, pin, callback){
   console.log('Registering Sensor');
 }

 GrovePiBoard.prototype.unRegisterSensor = function(sensor){
   console.log('Un Registering Sensor');
 }


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
