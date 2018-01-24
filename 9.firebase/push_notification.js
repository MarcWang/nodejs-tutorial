var FCM = require('fcm-push');

const KEY = '';
var fcm = new FCM(KEY);

var message = {
    to: '/topics/6a50-4381-11e7-80eb-ad5a36ffd224', // required fill with device token or topics
    priority: 'high',
    data: {
        your_custom_data_key: 'your_custom_data_value'
    },
    notification: {
        title: '測試中 - 第13次',
        body: '請忽略該訊息',
        click_action: 'FCM_PLUGIN_ACTIVITY',
        sound: 'default',
        badge: 66,
        color: '#3bc0ab',
        icon: 'fcm_push_icon'
    }
};

fcm.send(message)
    .then(function(response) {
        console.log("Successfully sent with response: ", response);
    })
    .catch(function(err) {
        console.log("Something has gone wrong!");
        console.error(err);
    })