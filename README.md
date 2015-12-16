node-red-node-grovepi
=====================
A <a href="http://nodered.org" target="_new">Node-RED</a> node to listen to and control GrovePi sensors and actuators.

Install
-------

Eventually this project will be able to be installed using npm. For now it requires a bit of manual work:
* Clone the repository onto your raspberry pi
* Install the node-grovepi npm (https://www.npmjs.com/package/node-grovepi)
* Create a directory inside the /home/pi/.node-red or ~/.node-red called 'nodes'
* Symlink the grovepi directory into the nodes directory (something like: `ln -s /home/pi/git/node-red-node-grovepi/grovepi grovepi`)


Usage
-----

Provides a few node, some to read data from sensors and a few to send data to actuators.


### Analog Input Node

Reads data from GrovePi Analog sensors. This node simply sends a numerical value between 0 and 1024 (check this).

### Digital Input Node

Reads data from GrovePi Digital sensors. This node requires that the user selects the type of digital sensor attached.
Choices currently include:
 * Button (1/0)
 * Sound
 * Ultrasonic Range
 * Temperature / Humidity

Depending on the sensor type selected, the payload will differ. For instance, the button type will return a JSON object containing a 'state' key e.g.

```
{ state: true }
```

The Temperature / Humidity sensor will return both values in separate keys

```
{
    temperature: 22.5,
    Humidity: 39
}
```

### Output Node

Sends data to GrovePi Actuators e.g. LEDs, Buzzers.
Since Output nodes can either be high or low, the payload sent to the node should reflect this. The following are acceptable:

```1 or 0, true or false ```

Any other value will be treated as 1 / true and the output will be put high.

### Serial LCD Node

Not sure how to do this yet. One thing at a time!

To-Do
-----
- [x] Analog and Digital Input Nodes.
- [x] GrovePi NodeJS bindings.
- [x] Digital Sensor callbacks require sensor specific code.
- [x] Output Node.
- [ ] Serial Node for Graphical LCD.
- [ ] Allow Overrides of Output & LCD node through payloads.
- [x] Help Text for all nodes
- [ ] Improve node configuration i.e. auto-detect board.
- [ ] Figure out the Sound Digital input sensor
- [ ] Get installation working with npm.


Known Issues
------------
