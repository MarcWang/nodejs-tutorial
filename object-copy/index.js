const Immutable = require('immutable');
const _ = require('lodash');


let obj = { pineapple: 789 };
console.log(Object.getOwnPropertyDescriptor(obj, 'pineapple'));
// {
//     value: 789,
//     writable: true,
//     enumerable: true,
//     configurable: true
// }

// non-enumerable property
Object.defineProperty(obj, 'apple', {
    value: 123,
    writable: false,
    configurable: false,
    enumerable: false
});
console.log(Object.getOwnPropertyDescriptor(obj, 'apple'));
// {
//     value: 123,
//     writable: false,
//     enumerable: false,
//     configurable: false
// }

// enumerable property
Object.defineProperty(obj, 'pen', {
    value: 456,
    writable: false,
    configurable: false,
    enumerable: true
});
console.log(Object.getOwnPropertyDescriptor(obj, 'pen'));
// {
//     value: 456,
//     writable: false,
//     enumerable: true,
//     configurable: false
// }



const ImmutableObj = Immutable.fromJS(obj);
console.log(ImmutableObj);

const _Obj = _.cloneDeep(obj);
console.log(_Obj);

const assignObj = Object.assign({}, obj);
console.log(assignObj);


console.log(Object.getOwnPropertyNames(obj));
let newObj = {};
Object.getOwnPropertyNames(obj).forEach((key) => {
    Object.defineProperty(newObj, key, {
        value: obj[key],
        writable: true,
        configurable: true,
        enumerable: true
    });
});
console.log(newObj);
