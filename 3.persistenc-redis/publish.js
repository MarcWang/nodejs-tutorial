const redis = require("redis");
const pub = redis.createClient();

pub.on('ready', () => {
    console.log('connect');
    setInterval(function() {
        pub.publish("channel", "I am sending a message.");
    }, 3000);
});

pub.on('error', (err) => {
    console.log(err);
});
