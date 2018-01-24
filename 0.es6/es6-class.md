## ES6 - 類別 (classes)

要在ES6中使用class必須加入`"strict mode"`

類別實際上是函數(functions)，簡單又分為以下兩種:

- 類別敘述(class expressions)
- 類別宣告(class declarations)

建構子(constructor)用來建立和初始化一個類別的物件，一個類別只能有一個名為 `constructor`

**ES6 Class語法**
```js
class User {
    constructor(firstName, lastName) {
        this._firstName = firstName
        this._lastName = lastName
    }

    fullName() {
        return this._firstName + " " + this._lastName;
    }
}
let user = new User('Marc', 'Wang')
console.log(user.fullName());
```

**ES5 Class語法**
```js
function User(firstName, lastName) {
    this._firstName = firstName;
    this._lastName = lastName;
}

User.prototype.fullName = function() {
    return this._firstName + " " + this._lastName;
}

let user = new User('Marc', 'Wang')
console.log(user.fullName());
```

**類別宣告(class declaration)**
```js
class User {
    constructor(firstName, lastName) {
        this._firstName = firstName
        this._lastName = lastName
    }
    fullName() {
        return this._firstName + " " + this._lastName;
    }
}
let user = new User('Marc', 'Wang')
console.log(user.fullName());
```

**類別敘述(class expressions)**
```js
var User = class {
    constructor(firstName, lastName) {
        this._firstName = firstName
        this._lastName = lastName
    }
    fullName() {
        return this._firstName + " " + this._lastName;
    }
};
let user = new User('Marc', 'Wang')
console.log(user.fullName());

```


**原型方法(Prototype methods)**

`set`只能有一個參數

```js
class User {
    constructor(firstName, lastName) {
        this._firstName = firstName
        this._lastName = lastName
    }

    get fullName() {
        return this.combFullName()
    }

    set firstName(firstName) {
        this._firstName = firstName
    }

    set lastName(lastName) {
        this._lastName = lastName
    }

    combFullName() {
        return this._firstName + " " + this._lastName;
    }
}

let user = new User('Marc', 'Wang');
console.log(user.fullName);
console.log(user.combFullName());
```

**靜態方法(Static methods)**

`static`不需要實體化它所屬類別的實例就可以被呼叫

```js
class User {
    constructor(firstName, lastName) {
        this._firstName = firstName
        this._lastName = lastName
    }

    get fullName() {
        return this.combFullName()
    }

    set firstName(firstName) {
        this._firstName = firstName
    }

    set lastName(lastName) {
        this._lastName = lastName
    }

    combFullName() {
        return this._firstName + " " + this._lastName;
    }

    static match(user1, user2) {
        var score = Math.floor((Math.random() * 100) + 1);
        return user1.fullName + " and " + user2.fullName + ", match score is " + score;
    }
}

let user1 = new User('Marc', 'Wang');
let user2 = new User('Ingrid', 'Tung');
console.log(User.match(user1, user2));
```


**擴充（extends）繼承（Inherit）**

`super` 可用來呼叫其父類別的函數

```js
class Parent {
    constructor(value) {
        this._value = value;
    }

    add() {
        return this._value + 3;
    }

    sub() {
        return this._value - 10;
    }
    sum(value){
        return this._value + value;
    }
}

class Child extends Parent {
    add() {
        return this._value + 5;
    }
    sum(value){
        return super.sum(value) + 5;
    }
}

var num1 = new Parent(5);
console.log(num1.add();     //8
console.log(num1.sub());    //-5
console.log(num1.sum(6));   //11

var num2 = new Child(5);
console.log(num2.add());    //10
console.log(num2.sub());    //-5
console.log(num2.sum(6));   //16
```