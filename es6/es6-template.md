## ES6 - 字串樣板 (Template Strings)

NodeJS => ES6支援程度
- shipping (開發完成並默認支持)
- staged (開發完成，但必須使用`--harmony`參數)
- in progress (開發中)


**Multiline strings**

不需要再使用`\n`來換行

ES5的寫法
```js
console.log(`In JavaScript '\n' is a line-feed.`)
```

ES6的寫法
```js
console.log(`In JavaScript this is
 not legal.`)
 ```

**Expression interpolation**

使用`${expression}`就可以快速組合在字串中

ES5的寫法
```js
var name = "Mario",
    time = "today";
console.log('Hello ' + name + ', how are you ' + time + '?');
```

ES6的寫法
```js
var name = "Mario",
    time = "today";
console.log(`Hello ${name}, how are you ${time}?`);
```


**Tagged template literals**

```js
var a = 5;
var b = 10;
function tag(strings, ...values) {
    console.log(strings[0]);    // "Hello "
    console.log(strings[1]);    // " world "
    console.log(values[0]);     // 15
    console.log(values[1]);     // 50

    return "Yes";
}

tag `Hello ${ a + b } world ${ a * b }`;
```