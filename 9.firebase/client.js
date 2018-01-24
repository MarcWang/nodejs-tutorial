var firebase = require("firebase");

firebase.initializeApp({
    serviceAccount: './firebase.json',
    databaseURL: 'https://myproject-c54eb.firebaseio.com/'
});

var db = firebase.database();

var ref = db.ref("/");
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});

// const email = 's4161035@gmail.com';
// const password = '2511213';
// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
//     console.log(error);
// });

// const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
//     'size': 'invisible',
//     'callback': function(response) {}
// });
// // [END appVerifier]
// recaptchaVerifier.render().then(function(widgetId) {
//     window.recaptchaWidgetId = widgetId;
// });

// const phone = '+886931853895';
// const appVerifier = recaptchaVerifier.
// firebase.auth().signInWithPhoneNumber(phone, appVerifier)
//     .then(function(confirmationResult) {
//         console.log(confirmationResult);
//         // SMS sent. Prompt user to type the code from the message, then sign the
//         // user in with confirmationResult.confirm(code).
//     }).catch(function(error) {
//         console.log(error);
//         // Error; SMS not sent
//         // ...
//     });