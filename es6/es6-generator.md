## ES6 - 生成器 (Generators)

Generator的幾個重要規則
- 函數執行到`yield`時會先暫停，並返回呼叫函數處繼續執行
- 要呼叫暫停以下的程式時，需要呼叫`next`方法
- 函數宣告方式必須加星號`*function()`

```js
function* gen(firstValue) {
    console.log('call first');
    var secondValue = yield `input first value ${firstValue}`;
    console.log('call second');
    yield `input second value ${secondValue}`;
    if (secondValue == 'yes') {
        yield `yes`;
    } else {
        yield `no`;
    }
}


var iter = gen("hello");
console.log(iter.next().value); //input first value hello
console.log(iter.next('yes').value); //input second value yes
console.log(iter.next().value); //yes
console.log(iter.next().done); //true
```

呼叫此函數，並回傳一個Generator物件。此時還沒執行函數中任何一行程式，所以你並不會看到`call first`的log。
```js
var iter = gen("hello");
```

呼叫Generator物件的`next()`方法，此時函數開始執行，所以你會看到顯示`call first`，執行遇到第一個yield時，暫停並返回，返回的物件`{value: 'input first value hello', done: false}`。
```JS
console.log(iter.next().value); //input first value hello
```

再次呼叫Generator物件的`next()`方法，並帶入參數`yes`，會繼續上次暫停執行的那一行，並將參數值給`secondValue`繼續執行，一樣執行到下一個yield時，暫停並返回物件`{value: 'input second value yes', done: false}`。
```js
console.log(iter.next('yes').value); //input second value yes
```

判斷使否結束是依據返回物件中的`done`值，`true`表示已結束，反之，尚可繼續執行。
```js
console.log(iter.next().value); //yes
console.log(iter.next().done); //true
```