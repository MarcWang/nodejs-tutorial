var logger = require('fluent-logger')
// The 2nd argument can be omitted. Here is a default value for options.
logger.configure('fluent', {
    host: '192.168.105.156',
    port: 24224,
    timeout: 3.0,
    reconnectInterval: 600000 // 10 minutes
});

// send an event record with 'tag.label'
logger.emit('label', { record: 'this is a log' });

let i = 0;
setInterval(() => {
    logger.emit('biz', { record: 'this is a biz log', count: i });
    i++;
}, 2);

let j = 0;
setInterval(() => {
    logger.emit('crm', { record: 'this is a crm log', count: j });
    j++;
}, 3);

logger.on('error', function (error) {
    console.log(error);
});
logger.on('connect', function () {
    console.log('connected!');
});

