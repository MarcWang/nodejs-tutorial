## ES6 - 解構 (Destructuring)

解構意思是指自動分析物件或陣列與目標物件或陣列值相對應的關係

NodeJS => ES6支援程度
- shipping (開發完成並默認支持)
- staged (開發完成，但必須使用`--harmony`參數)
- in progress (開發中)

如果是使用nodejs，請查詢版本支援ES6的程度，本次使用版本為4.3，所以必須加參數
`--harmony_destructuring`。

### Array Destructuring
```js
var srcArr = [1, 2, 3, 4];
//ES5寫法
var a = srcArr[0];
var b = srcArr[1];
var c = srcArr[2];
var d = srcArr[3];
console.log(`ES5 Result = a: ${a}, b:${b}, c:${c}, d:${d}`); //a = 1,b = 2,c = 3,d = 4
//ES6寫法
var a, b, c, d; //可以省略不需要先宣告
var [a, b, c, d] = srcArr;
console.log(`ES6 Result = a: ${a}, b:${b}, c:${c}, d:${d}`); //a = 1,b = 2,c = 3,d = 4
```

**也可以略過不需要賦予值的參數**
```js
var [a, , b, ] = srcArr;
console.log(`ES6 Result = a: ${a}, b:${b}`); //a = 1,b = 3
```

**使用Rest Parameters**
```js
var [a, ...b] = srcArr;
console.log(`ES6 Result = a: ${a}, b:${b}`); //a = 1,b = [2,3,4]
```

**交換值(Swap Values)**
```js
var [b, a] = [a, b];
console.log(`ES6 Result = a: ${a}, b:${b}`); //a = [2,3,4],b = 1
```


### Object Destructuring
```js
var srcObj = {
    FirstKey: '1',
    SecondKey: '9'
}

//ES5寫法
var FirstKey = srcObj.FirstKey;
var SecondKey = srcObj.SecondKey;
console.log(`ES5 Result = FirstKey: ${FirstKey}, SecondKey:${SecondKey}`); //FirstKey value = 1, SecondKey value = 9
//ES6寫法
var FirstKey, SecondKey;
var { FirstKey, SecondKey } = srcObj;
console.log(`ES6 Result = FirstKey: ${FirstKey}, SecondKey:${SecondKey}`); //FirstKey value = 1, SecondKey value = 9
```

**賦予新值變數**
```js
var { FirstKey: firstValue, SecondKey: secondValue } = srcObj;
console.log(`ES6 Result = firstValue= ${firstValue}, secondValue=${secondValue}`); //firstValue = 1, secondValue = 9
```

### Destructuring Function Arguments
```js
function es5FindHomawork(student, homework) {
    if (homework.math) {
        console.log('ES5 Result = do math homework');
    }
    if (homework.english) {
        console.log('ES5 Result = do english homework');
    }
}

function es6FindHomawork(student, { math, english }) {
    if (math) {
        console.log('ES6 Result = do math homework');
    }
    if (english) {
        console.log('ES6 Result = do english homework');
    }
}
es5FindHomawork('Mario', { math: true, english: false });
es6FindHomawork('Mario', { math: true, english: false });
```

