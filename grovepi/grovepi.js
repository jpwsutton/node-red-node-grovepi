/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * Authors:
 *    - James Sutton
 **/
module.exports = function(RED) {
    "use strict";
    var GrovePi = require('node-grovepi').GrovePi;


    function GrovePiLightSensorNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var Commands = GrovePi.commands;
        var Board = GrovePi.board;
        var LightAnalogSensor = GrovePi.sensors.LightAnalog;

        var board = new Board({
          debug: true,
          onError: function(err){
            console.log('GrovePiLightSensorNode: Something went wrong');
            console.log(err);
          },
          onInit: function(res) {
            if(res) {
              var lightSensor = new LightAnalogSensor(2)
              lightSensor.on('change', function(res) {
                var msg = {};
                msg.payload = res;
                node.send(msg);
              })
            }
          }
        });
        board.init();

    }
    RED.nodes.registerType("Grove Light Sensor",GrovePiLightSensorNode);
}
