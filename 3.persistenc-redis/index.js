var redis = require("redis");

const MAX_RETRY_ATTEMPT = 10;
const MAX_RETRY_TIME = 1000 * 60;

function retry_strategy(options) {
    // if (options.error.code === 'ECONNREFUSED') {
    //     // End reconnecting on a specific error and flush all commands with a individual error
    //     return new Error('The server refused the connection');
    // }
    if (options.total_retry_time > MAX_RETRY_TIME) {
        return new Error('Retry time more then MAX_RETRY_TIME');
    }
    if (options.times_connected > 3) {
        return undefined;
    }
    if (options.attempt > MAX_RETRY_ATTEMPT) {
        return new Error('Retry attempt more then MAX_RETRY_ATTEMPT');
    }
    return Math.min(options.attempt * 100, 3000);
}

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client = redis.createClient({
    retry_strategy: retry_strategy,
    password: undefined
});

client.on('ready', () => {
    console.log('connect');
});

client.on('error', (err) => {
    console.log(err);
});

client.on('reconnecting', (value) => {
    console.log(`Reconnect Redis ${value.error.address}:${value.error.port}, counts = ${value.attempt}`);
});

// client.set("string key", "string val", redis.print);
// client.hset("hash key", "hashtest 1", "some value", redis.print);
// client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
// client.hkeys("hash key", function(err, replies) {
//     console.log(replies.length + " replies:");
//     replies.forEach(function(reply, i) {
//         console.log("    " + i + ": " + reply);
//     });
//     client.quit();
// });

let obj = {
    school: 'A',
    class: 'B'
}
client.hmset('school', obj);
client.hgetall('school', function(err, obj) {
    console.log(obj);
});

client.set("fruit", "apple");
client.get('fruit', function(err, value) {
    console.log(value);
})
