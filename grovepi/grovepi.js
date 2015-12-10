module.exports = function(RED) {
    function GrovePiNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        setInterval(function(){
            var msg = {};
            msg.payload = "Hi";
            node.send(msg);
        }, 1000);
        this.on('input', function(msg) {
            msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });
    }
    RED.nodes.registerType("Grove Button",GrovePiNode);
}
