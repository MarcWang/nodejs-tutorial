var isOnline = require('is-online');

isOnline(function(err, online) {
    console.log(online);
    //=> true
});
