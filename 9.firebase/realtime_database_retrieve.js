const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://marctalk-623a0.firebaseio.com",
    databaseAuthVariableOverride: {
        uid: "marcwang"
    }
});

const db = app.database();
const ref = db.ref("public_resource/school/class");

ref.orderByValue().limitToLast(3).on("value", (snapshot) => {
    snapshot.forEach((data) => {
        console.log(data.val());
    });
});

ref.once("value", (snapshot) => {
    console.log(snapshot.val());
});

ref.on("value", (snapshot) => {
    console.log('all changed')
    console.log(snapshot.val());
}, (errorObject) => {
    console.log("The read failed: " + errorObject.code);
});

ref.on("child_added", (snapshot, prevChildKey) => {
    const value = snapshot.val();
    console.log('add');
    console.log(value);
});

ref.on("child_changed", (snapshot) => {
    const value = snapshot.val();
    console.log('change');
    console.log(value);
});

ref.on("child_removed", (snapshot) => {
    const value = snapshot.val();
    console.log('remove');
    console.log(value);
});