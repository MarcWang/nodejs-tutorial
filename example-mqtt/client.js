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
    client.subscribe('presenceA', { qos: 1 }, () => {
        console.log('subscribe')
    });

    setInterval(() => {
        client.publish('presenceB', `message ${new Date()}`, { qos: 1 }, () => {
        });
    }, 1000)
});

client.on('message', function(topic, message, pakcet) {
    console.log(`${JSON.stringify(pakcet)}`);
    console.log(`client ${topic} : ${message.toString()}`);
    // client.end();
});
