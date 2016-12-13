const redis = require("redis");
const sub = redis.createClient();

sub.on("subscribe", function(channel, count) {
    console.log(channel + '   ' + count);
});

sub.on("message", function(channel, message) {
    console.log("sub channel " + channel + ": " + message);
});

sub.subscribe("channel");
