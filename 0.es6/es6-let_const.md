## ES6 -  (Let + Const)

NodeJS => ES6支援程度
- shipping (開發完成並默認支持)
- staged (開發完成，但必須使用`--harmony`參數)
- in progress (開發中)


**let**

`let`宣告的變數， 作用域僅限於該區塊 `{}`以內， 不能重複宣告
```js
let x = 3; //在最外層宣告等同於var x = 3
var z = 10; 
{
    let y = 5;
    var z = 3;
    console.log(`x = ${x}, y = ${y}, z = ${z}`); // x = 3, y = 5, z = 3
    // let y = 3; // 'y' has already been declared
}
console.log(`x = ${x}, y = ${y}`); // y is not defined
```

**const**

`const`宣告的值無法改變
```js
const x = 5;

x = 3; //TypeError: Assignment to constant variable
var x = 4; //SyntaxError: Identifier 'x' has already been declared
```