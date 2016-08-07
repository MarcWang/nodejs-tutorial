var mosca = require('mosca');

var ascoltatore = {
    type: 'redis',
    redis: require('redis'),
    db: 12,
    port: 6379,
    return_buffers: true, // to handle binary payloads
    host: "localhost",
    ttl: {
        // TTL for subscriptions is 23 hour
        subscriptions: 23 * 60 * 60 * 1000,
        // TTL for packets is 23 hour
        packets: 23 * 60 * 60 * 1000,
    },
};

var settings = {
    port: 1883,
    backend: ascoltatore,
    persistence: {
        factory: mosca.persistence.Redis
    }
};

var server = new mosca.Server(settings);

// server.published = function(packet, client, cb) {
//     if (packet.topic.indexOf('echo') === 0) {
//         return cb();
//     }

//     var newPacket = {
//         topic: packet.topic,
//         payload: packet.payload,
//         retain: packet.retain,
//         qos: packet.qos
//     };

//     console.log('newPacket', newPacket);

//     // server.publish(newPacket, cb);
// }


server.on('clientConnected', (client) => {
    console.log('client connected', client.id);
});

server.on('clientDisconnecting', (client) => {
    console.log('clientDisconnecting : ', client.id);
});

server.on('clientDisconnected', (client) => {
    console.log('Client Disconnected := ', client.id);
});

server.on('subscribed', (topic, client) => {
    console.log('subscribed : ', topic);
});

server.on('unsubscribed', (topic, client) => {
    console.log('unsubscribed : ', topic);
});

// fired when a message is received
server.on('published', (packet, client) => {
    // console.log('Published : ', packet.payload);
    // var message = {
    //   topic: 'presence1',
    //   payload: packet.payload, // or a Buffer
    //   qos: 1, // 0, 1, or 2
    //   retain: false // or true
    // };

    // server.publish(message, function() {
    //     console.log('done!');
    // });
});

server.on('ready', () => {
    console.log('Mosca server is up and running');
});
