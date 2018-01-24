var firebase = require('firebase');


firebase.initializeApp({
    serviceAccount: './firebase.json',
    databaseURL: 'https://myproject-c54eb.firebaseio.com/'
});

var db = firebase.database();

var ref = db.ref('/some_resource');
// ref.on("value", function(snapshot) {
//     console.log(snapshot.val());
// });


// var schoolRef = ref.child("school");
// schoolRef.set({
//     classA: {
//         students: 50,
//         teacher: 'Marc'
//     },
//     classB: {
//         students: 35,
//         teacher: 'Ingrid'
//     }
// });

// schoolRef.child("classC").set({
// 	students: 49,
//     teacher: 'Nick'
// });



// schoolRef.update({
//     classA: {
//         students: 47,
//         teacher: 'Marc'
//     }
// })

// schoolRef.update({
//     "classB/students": 41,
//     "classC/students": 51
// }, (error) => {
// 	if(error){
// 		console.log(`Data could not be saved ${error}`);
// 	}else{
// 		console.log('Data saved successfully.')
// 	}
// })

// var postRef = ref.child("posts");
// var newPost = postRef.push();
// var postId = newPost.key;
// console.log(postId)

// newPost.set({
// 	title: 'I like her',
// 	author: 'Marc'
// })

// postRef.push().set({
// 	title: 'He like me',
// 	author: 'Ingrid'
// })

var authorRef = db.ref('/some_resource/school/classA/students');
authorRef.transaction((current_value) => {
    return (current_value || 0) + 1;
})