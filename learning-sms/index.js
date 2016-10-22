var client = require('twilio')('TWILIO_AUTH_SID', 'TWILIO_AUTH_TOKEN');

client.sendMessage({
    to: '', 
    from: '+14797778343', 
    body: 'hi.' 
}, function(err, responseData) { 
    console.log(err);
    if (!err) { 
        console.log(responseData.from); 
        console.log(responseData.body); 
    }
});

