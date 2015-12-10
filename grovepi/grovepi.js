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
    var GrovePiBoard = require('GrovePiBoard').GrovePiBoard

    var board = new GrovePiBoard();



    function GrovePiLightSensorNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        if(board.isInitialised){
          // Board has been initialised
          this.log("GrovePiBoard has already been initilised");
        } else {
          this.warn("Not Initislised yet, starting GrovePiBoard");
          board =
          board.init();
        }

        var sensor = board.registerSensor('lightAnalog', 2, function(response){
          var msg = {};
          msg.payload = response;
          node.send(msg);
        });

        this.on('close', function(done) {
          this.log("UnRegistering Sensor");
          board.unRegisterSensor(sensor, function(){
            done();
          });
        });


    }
    RED.nodes.registerType("Grove Light Sensor",GrovePiLightSensorNode);
}
