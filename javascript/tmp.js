const obj = {
    'A': 'a',
    'B': 'b',
    'C': 'c'
}

// js remove property of object

// Reflect.deleteProperty(obj, 'A');
// delete obj['A'];
delete obj.A;
// obj.A = undefined;
console.log(obj);

// console.log('Object.getOwnPropertyNames(obj).forEach');
// Object.getOwnPropertyNames(obj).forEach((key, idx, array) => {
//     console.log(key + ' -> ' + obj[key]);
// });

// console.log('Object.keys(obj).forEach');
// Object.keys(obj).forEach((key) => {
//     console.log(key + ' -> ' + obj[key]);
// });

// console.log('Object.keys(obj).map');
// Object.keys(obj).map((key) => {
//     console.log(key + ' -> ' + obj[key]);
// });

// console.log('for in');
// for (const key in obj) {
//     console.log(key + ' -> ' + obj[key]);
// }

// console.log('for of');
// for (const key of Object.keys(obj)) {
//     console.log(key + ' -> ' + obj[key]);
// }


function testFunc(...params)
{
	console.log(this);
	console.log(params);
}

Reflect.apply(testFunc, 5, [7]);

Function.prototype.apply.call(testFunc, 5, [7]);

