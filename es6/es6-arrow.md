## ES6 - 箭頭函數( Arrow Function )

箭頭函數表示式 (Arrow function expression，也是所謂的 fat arrow function) 比起一般的函數表示式擁有更短的語法以及詞彙上綁定 this 變數，所有的箭頭函數都是無名函數 (anonymous function).

**箭頭函數有兩個重要的特性：更短的函數寫法與 this 變數綁定**

### 更短的函數寫法

```js
() => expression 
```
等同於
```js
function(){
    return expression;
}
```

**沒有輸入任何參數的寫法**
```js
var arrow = () => "no parameter";
console.log(arrow()); //no parameter
```

**輸入一個參數的寫法**
```js
var arrow = (arg) => "one parameter : " + arg;
console.log(arrow(123)); //one parameter : 123
```

**輸入多個參數的寫法**
```js
var arrow = (arg1, arg2) => "multiple parameter : " + arg1 + "," + arg2;
console.log(arrow("value1", "value2")); //multiple parameter : value1,value2
```

**如果包含多個陳述 (statement)時，必須使用'{}'**
```js
var arrow = (arg1, arg2) => {
    var res1 = (arg1) => arg1+2;
    var res2 = (arg2) => arg2+arg2;
    var sum = res1(arg1)+res2(arg2);
    return sum;
v更短的函數寫法
};
console.log(arrow(5,6));
```

**結合Map的使用方式**
```js
var a = [
    "Marc",
    "Mario",
    "BuBu",
    "Ingrid"
];

var es5Map = a.map(function(s) {
    return s.length;
});
console.log(es5Map);

var es6Map = a.map(s => s.length);
console.log(es6Map);
```

**結合Filter的使用方式**
```js
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let es5Filter = numbers.filter(function(number) {
    return number % 2;
});
console.log(es5Filter);

let es6Filter = numbers.filter(number => number % 2);
console.log(es6Filter);
```

### this 變數綁定

在以往的使用方式，會碰到以下問題，立即函數底下的this無法與functionNonArrow的this共用，以往可使用`self = this`帶進去立即函數，變成`self.value++`，或者在使用立即函數時使用call或apply的方式把this帶進去。

```js
function functionNonArrow() {
    this.value = 0;
    console.log(this.value); //0

    //execute below function
    (function(){
        try{
            this.value++; 
        }catch(e){
            console.log(e); //Cannot read property 'value' of undefined
        }
    })();
    console.log(this.value); //0
};
var test = new functionNonArrow();
```

使用arrow function 箭頭函數會自動將 `this` 變數綁定到其定義時所在的物件

```js
function functionArrow() {
    this.value = 0;
    console.log(this.value); //0

    //execute below function
    (() => { this.value++; })();
    console.log(this.value); //1
};

var test = new functionArrow();
```