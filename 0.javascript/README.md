

### Array.prototype.concat()

**Syntax**
> var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])

可以連接多個Array，不會改變原本的Array，但會回傳一個連接後的Array

```js
let arr = [1,2,3];
let concat_arr = arr.concat(['a','b','c']);

console.log(concat_arr);
// [1, 2, 3, 'a', 'b', 'c']
```

加入連接的值可以是 String、Number 或 Boolean

```js
let arr = [1,2,3]
let str = String('STR');
let num = Number(5);
let boolean = Boolean(true);
let concat_arr = arr.concat(str, num, boolean);

console.log(concat_arr);
// [1, 2, 3,'STR', 5, true]
```

如果是 new String、 new Number、 new Boolean 會是以物件型態加入

```js
let arr = [1,2,3]
let str = new String('STR');
let num = new Number(5);
let boolean = new Boolean(true);
let concat_arr = arr.concat(str, num, boolean);

console.log(concat_arr);
// [ 1, 2, 3, [String: 'STR'], [Number: 5], [Boolean: true] ]
```

### Array.prototype.every()

**Syntax**
> arr.every(callback[, thisArg])

針對 Array 裡每個值做處理，所有都滿足條件回傳 true，否則回傳 false

```js
function isBigEnough(element, index, array) {
    return element >= 10;
}

let res = [12, 5, 8, 130, 44].every(isBigEnough);
console.log(res);
// false
```

也可以寫成箭頭函式

```js
let res = [12, 5, 8, 130, 44].every(elem => elem >= 10);
console.log(res);
// false
```

### Array.prototype.fill()

**Syntax**
> arr.fill(value)
> arr.fill(value, start)
> arr.fill(value, start, end)

這裡會使用到三個變數，`value` 是指填充在Array的值，`start` 指的是起始位置，初始值是 0 ，`end` 指的是結束位置，初始值是 Array.length。

```js
let arr = [1, 2, 3, 4, 5];
arr.fill(5); // [ 5, 5, 5, 5, 5 ]
arr.fill(value = 5, start = 0, end = arr.length); // [ 5, 5, 5, 5, 5 ]
arr.fill(5, 1); // [ 1, 5, 5, 5, 5 ]
arr.fill(5, 1, 3); // [ 1, 5, 5, 4, 5 ]
arr.fill(5, -2); // [ 1, 2, 3, 5, 5 ]
arr.fill(5, -6); // [ 5, 5, 5, 5, 5 ]
```

### Array.prototype.filter()

**Syntax**
> var new_array = arr.filter(callback[, thisArg])

列出Array內的值大於10

```js
function isBigEnough(element, index, array) {
    return element >= 10;
}

let res = [12, 5, 8, 130, 44].filter(isBigEnough);
console.log(res);
// [12, 130, 44]
```

舉一個例子，過濾帳號資料含 `username` 及 `password`的列表。

```js
let obj_arr = [{
    username: 'marc',
    password: 'A123456'
}, {
    username: 'marc_1',
    password: 'B123456'
}, {
    username: 'marc_2'
}, {
    email: 'marc@gmail.com'
}]

function accountFilter(acc) {
    return (acc.username !== undefined && acc.password !== undefined) ? true : false;
}

let res = obj_arr.filter(accountFilter);
console.log(res);
// [ { username: 'marc', password: 'A123456' },{ username: 'marc_1', password: 'B123456' } ]
```