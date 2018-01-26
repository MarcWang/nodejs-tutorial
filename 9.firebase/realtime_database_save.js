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
// const public_ref = db.ref("public_resource");
// public_ref.once("value", (snapshot) => {
//     console.log(snapshot.val());
// });

const ref = db.ref("public_resource/school/class");
// saving data with set
const classmates = [
    { name: 'Marc', id: '1001' },
    { name: 'David', id: '1002' },
    { name: 'Sam', id: '1003' },
    { name: 'Andy', id: '1004' }
];
classmates.map(c => {
    const users_ref = ref.child(c.id);
    users_ref.set({
        create_time: Date.now(),
        name: c.name,
        id: c.id
    });
});


// saving data with update
const first_exam_scores = [
    { id: '1001', scores: 75 },
    { id: '1002', scores: 65 },
    { id: '1003', scores: 79 },
    { id: '1004', scores: 85 }
];
first_exam_scores.map(c => {
    const users_ref = ref.child(c.id);
    users_ref.update({
        update_time: Date.now(),
        exams: {
            first: c.scores
        }
    });
});

const second_exam_scores = [
    { id: '1001', scores: 95 },
    { id: '1002', scores: 75 },
    { id: '1003', scores: 72 },
    { id: '1004', scores: 65 }
];
second_exam_scores.map(c => {
    const users_ref = ref.child(c.id);
    const exams_ref = users_ref.child('exams');
    exams_ref.update({
        second: c.scores
    });
});

// saving data with push
const late_1_classmates = [
    { id: '1001', reason: 'reason 1', time: '08:30' },
    { id: '1004', reason: 'reason 2', time: '08:35' }
];
late_1_classmates.map(o => {
    const users_ref = ref.child(o.id);
    const late_ref = users_ref.child('late');
    late_ref.push().set({
        reason: o.reason,
        time: o.time
    });
})

const late_2_classmates = [
    { id: '1002', reason: 'reason 2', time: '08:20' },
    { id: '1004', reason: 'reason 2', time: '08:39' }
];
late_2_classmates.map(o => {
    const users_ref = ref.child(o.id);
    const late_ref = users_ref.child('late');
    late_ref.push().set({
        reason: o.reason,
        time: o.time
    });
})

// saving data with transaction
const call_1_classmates = [
    { id: '1001' },
    { id: '1002' },
    { id: '1003' }
];
call_1_classmates.map(c => {
    const users_ref = ref.child(c.id);
    const calls_ref = users_ref.child('calls')
    calls_ref.transaction(value => (value || 0) + 1);
});

const call_2_classmates = [
    { id: '1001' },
    { id: '1002' },
    { id: '1004' }
];
call_2_classmates.map(c => {
    const users_ref = ref.child(c.id);
    const calls_ref = users_ref.child('calls')
    calls_ref.transaction(value => (value || 0) + 1);
});