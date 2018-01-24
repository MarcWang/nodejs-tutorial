var fruits = ["Apple", "Banana"];

console.log(fruits.length);

fruits.forEach((item, index, array) => {
    console.log(item, index, array);
});

// Copy an Array
let shallowCopy = fruits.slice();
console.log(shallowCopy);

// Add to the end of an Array
fruits.push("Orange");
console.log(fruits);

// Remove from the end of an Array
fruits.pop();
console.log(fruits);

// Remove from the front of an Array
fruits.shift();
console.log(fruits);

// Add to the front of an Array
fruits.unshift("Strawberry");
console.log(fruits);

// Find the index of an item in the Array
let pos = fruits.indexOf("Banana");
console.log(pos);

// Remove an item by Index Position
fruits.splice(pos, 1);
console.log(fruits);

fruits[5] = 'mango';
console.log(Object.keys(fruits));

// Property attributes of array.length, Writable = yes, Enumerable = no, Configurable = no
fruits.length = 10;
console.log(fruits.length);


console.log(Array.from({ length: 5 }, (v, k) => k));

// between 0 and 2**32-1 (inclusive)
let arr = new Array(Math.pow(2, 32) - 1);
