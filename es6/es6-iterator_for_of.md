## ES6 -  (Iterators + For...Of)

**for...of**

一般使用對ARRAY取值分為下列幾種方法

```js
var array = ['a', 5, { key: "value" }];
var set = new Set().add('b').add(2).add({ key: "value" });
var map = new Map().set('c', 1).set('d', 2);
var obj = {
    values: [],
    [Symbol.iterator]() {
        let idx = -1,
            values = this.values;
        return {
            next() {
                idx++;
                return (idx < values.length) ? { value: values[idx], done: false } : { done: true };
            }
        }
    }
}
obj.values = array;

for (var i = 0; i < array.length; i++) {
    console.log(`value = ${array[i]}, type of i = ${typeof(i)}`);
}

// 缺點是無法在forEach中使用break, return 和 continue。
array.forEach(function(i) {
    // if( i == 5 ){
    //  break; // SyntaxError: Illegal break statement
    // } 
    console.log(`value = ${i}, type of i= ${typeof(i)}`);
})

// i 的型態是string，盡量避免使用此方式做運算，因為有可能產生 i + 2 = 12 的情形，因為 i 的型態是字串，並不是數字。
for (let i in array) {
    console.log(`value = ${array[i]}, type of i = ${typeof(i)}`);
}

// `for...of`可以支援Array, Set及Map這三個原生結構及Object含定義[Symbol.iterator]
for (let i of array) {
    console.log(`value = ${i}, type of i= ${typeof(i)}`);
}

for (let i of set) {
    console.log(`value = ${i}, type of i= ${typeof(i)}`);
}

for (let i of map) {
    console.log(`value = ${i}, type of i= ${typeof(i)}`);
}

for (let i of obj) {
    console.log(`value = ${i}, type of i= ${typeof(i)}`);
}
```

**Iterator**
自製迭代器必須要注意幾點，1.回傳值必須有一個函數next()，2.該函數的回傳值必須包含value與done兩個屬性，value的值自訂便可，done是判斷是否該停止，所以是true or false

```js
function makeIterator(array) {
    var nextIndex = 0;
    return {
        next: function() {
            return nextIndex < array.length ? { value: array[nextIndex++], done: false } : { done: true };
        }
    };
}

var it = makeIterator(array);
console.log(it.next().value); //a
console.log(it.next().value); //5
console.log(it.next().value); //{key:'value'}
console.log(it.next().done); //true
console.log(it.next().done); //true
```