var admin = require("firebase-admin");

var serviceAccount = require("./firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tw-wafflecity-app-usr.firebaseio.com"
});

const recaptchaVerifier = new admin.auth.RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': function (response) {
    }
});
// [END appVerifier]
recaptchaVerifier.render().then(function (widgetId) {
    window.recaptchaWidgetId = widgetId;
});