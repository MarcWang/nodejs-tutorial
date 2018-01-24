
```js
const obj = {
    'A': 'a',
    'B': 'b',
    'C': 'c'
}
```

### get all property of object

```js
Object.getOwnPropertyNames(obj).forEach((key, idx, array) => {
    console.log(key + ' -> ' + obj[key]);
});
```

```js
Object.keys(obj).forEach((key) => {
    console.log(key + ' -> ' + obj[key]);
});
```

```js
Object.keys(obj).map((key) => {
    console.log(key + ' -> ' + obj[key]);
});
```

```js
for (const key in obj) {
    console.log(key + ' -> ' + obj[key]);
}
```

```js
for (const key of Object.keys(obj)) {
    console.log(key + ' -> ' + obj[key]);
}
```


### remove property of object