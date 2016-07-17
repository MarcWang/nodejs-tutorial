var mqtt = require('mqtt');
var settings = {
    host: 'localhost',
    port: 1883,
    keepalive: 10,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clientId: 'client-b'
    // clean: false
}

var client = mqtt.connect(settings);
client.on('connect', function() {
    client.subscribe('presence', { qos: 1 }, (err, granted) => {
        console.log(granted)
    });
});

client.on('message', function(topic, message, pakcet) {
    console.log(`client ${message.toString()}`);
    // console.log(pakcet);
    // client.end();
});

client.on('error', function(err) {
    console.log(err);
    client.end();
});

client.on('close', function() {
    console.log(" disconected");
});
