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
    var GrovePiBoard = require('./GrovePiBoard').GrovePiBoard


    function GrovePiLightSensorNode(config) {
        RED.nodes.createNode(this,config);

        // Retrieve the board-config node
       this.boardConfig = RED.nodes.getNode(config.board);

       var node = this;

        if(node.boardConfig){
          // Board has been initialised
          this.log("Configuration Found")
          if(node.boardConfig.groveBoard){
            this.log("GrovePiBoard has already been initilised");
          } else {
            this.warn("Not Initislised yet, starting GrovePiBoard");
            node.boardConfig.groveBoard = new GrovePiBoard();
            node.boardConfig.groveBoard.init();
          }
          this.log("Can now do stuff!");

        } else {
          node.error("Node has no configuration!");
        }

        // var sensor = board.registerSensor('lightAnalog', 2, function(response){
        //   var msg = {};
        //   msg.payload = response;
        //   node.send(msg);
        // });
        //
        // this.on('close', function(done) {
        //   this.log("UnRegistering Sensor");
        //   board.unRegisterSensor(sensor, function(){
        //     done();
        //   });
        // });


    }
    RED.nodes.registerType("Grove Light Sensor",GrovePiLightSensorNode);

    function GrovePiConfigNode(n) {
       RED.nodes.createNode(this,n);
       this.boardType = n.boardType;
       this.name = n.name;
       this.usedPins = [];
       // this.groveBoard = new grovePiBoard();
   }
   RED.nodes.registerType("grovepi-config",GrovePiConfigNode);
}
