var mqtt = require('mqtt');
// var client = mqtt.connect('mqtt://test.mosquitto.org');
var settings = {
    host: 'localhost',
    port: 1883,
    keepalive: 10,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clientId: 'client-a',
    clean: false
}

var client = mqtt.connect(settings);

// var client = mqtt.connect({ port: 1883, host: 'localhost', keepalive: 10000});
client.on('connect', function() {
    client.subscribe('presence', { qos: 0 }, () => {
        console.log('subscribe')
    });

    setInterval(() => {
        client.publish('presence1', `message ${new Date()}`, { qos: 0 }, () => {
        });
    }, 1000)
});

client.on('message', function(topic, message) {
    console.log(`client ${message.toString()}`);
    // client.end();
});
