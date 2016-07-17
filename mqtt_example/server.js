var mosca = require('mosca');

var ascoltatore = {
    //using ascoltatore
    type: 'mongo',
    url: 'mongodb://localhost:27017/mqtt',
    pubsubCollection: 'ascoltatori',
    mongo: {}
};

var settings = {
    port: 1883,
    backend: ascoltatore
};

var server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

server.on('clientDisconnected', function(client) {
    console.log('Client Disconnected     := ', client.id);
});

server.on('subscribed', function(topic, client) {
    console.log("Subscribed :=", client.packet);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log(client)
    // console.log('Published', packet.payload);
    // var message = {
    //   topic: 'presence',
    //   payload: 'dfdfd', // or a Buffer
    //   qos: 1, // 0, 1, or 2
    //   retain: false // or true
    // };

    // server.publish(message, function() {
    //     console.log('done!');
    // });
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}
