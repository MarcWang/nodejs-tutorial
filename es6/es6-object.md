## ES6 - 物件語法 (Object Literal)


/**Shorter property name**

```js
var name = 'Mario',
    age = 29,
    gender = 'male';

var es5Obj = { name: name, age: age, gender: gender };
var es6Obj = { name, age, gender };
console.log(es5Obj); //{ name: 'Mario', age: 29, gender: 'male' }
console.log(es6Obj); //{ name: 'Mario', age: 29, gender: 'male' }
```


**Shorthand method names**
```js
const obj = {
    get phone() {
        return this._phone;
    },
    set phone(phone) {
        if (!this.validatePhone(phone)) {
            this._phone = '+886' + phone.slice(2, 10);
        }
    },
    validatePhone(phone) {
        return (phone.indexOf("+886") > 0) ? true : false;
    },
}
obj.phone = '0931123456';
console.log(obj.phone); //+88631123456
```

**Dynamic property name**
```js
function es5(type, data) {
    var payload = {}
    payload[type] = data
    return payload
}

function es6(type, data) {
    return {
        [type]: data
    }
}

console.log(es5('type', 'data'));
console.log(es6('type', 'data'));
```

**__proto__**