var mqtt = require('mqtt');
var settings = {
    host: 'localhost',
    port: 1883,
    keepalive: 10,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clientId: 'client-b',
    clean: false
}

var client = mqtt.connect(settings);
client.on('connect', function() {
    client.subscribe('presenceB', { qos: 1 }, (err, granted) => {
        console.log(granted)
    });
});

client.on('offline', function() {
    console.log('offline')
});

client.on('message', function(topic, message, pakcet) {
    // console.log(`${JSON.stringify(pakcet)}`);
    console.log(`client ${topic} : ${message.toString()}`);
    // setTimeout(()=>{
    //     client.publish('presenceA', `message ${new Date()}`, { qos: 1 }, () => {
    //     });
    // },1000)
    // console.log(pakcet);
    // client.end(()=>{
    //     console.log('disconnect');
    //     client.reconnecting = true;
    // });
});

client.on('error', function(err) {
    console.log(err);
    client.end();
});

client.on('close', function() {
    console.log(" close");
});
