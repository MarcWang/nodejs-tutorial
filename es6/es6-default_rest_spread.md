## ES6 -  (Default + Rest + Spread)

NodeJS => ES6支援程度
- shipping (開發完成並默認支持)
- staged (開發完成，但必須使用`--harmony`參數)
- in progress (開發中)

**Default**
```js
function es5DefaultFunc() {
    var value = arguments.length <= 0 || arguments[0] === undefined ? 5 : arguments[0];
    console.log(value);
}

function es6DefaultFunc(value = 5) {
    console.log(value);
}

es5DefaultFunc();
es6DefaultFunc();
```


**REST**

`...y`代表x之後的參數都用一個陣列表示 
```js
function es5RestFunc(x) {
    for (var i = 1; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
}
es5RestFunc(3, "hello", true);

function es6RestFunc(x, ...y) {
    for (var i = 0; i < y.length; i++) {
        console.log(y[i]);
    }
}
es6RestFunc(3, "hello", true)
```

**Spread**
```js
function sum(a, b, c) {
    return a + b + c;
}

// ES5寫法
var total = sum.apply(null, [1, 2, 3]);

// ES6寫法
var total = sum(...[1, 2, 3])
```