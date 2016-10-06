
要使用NodeJS去連接MongoDB的方式，一般大家熟悉使用[node-mongodb-native](https://github.com/mongodb/node-mongodb-native)或[mongoose](https://github.com/Automattic/mongoose)這兩個Module。

以下範例有些是ES6語法，所以執行時需要注意Node的版本是否支援。

**啟動MongoDB參數**

```bat
mongod.exe -dbpath .\db\mongodb --port 27017
```

### 建立連線

`connect(uri(s), [options], [callback])`

此API是MongoDB建立連線時使用，並可以同時連接多個MongoDB。

`uri(s)<String>` 連線MongoDB必須設定DB的Host(`dbHost`)、Port(`dbPort`)及名稱(`dbName`)

- MongoDB有設定帳號密
```js
const uri = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;
```

- MongoDB沒有設定帳號密
```js
const uri = `mongodb://${dbHost}:${dbPort}/${dbName}`;
```

`options<Object>` 連線參數設定

- `mongos` 設定true表示需要一次連接多個MongoDB

- `config.autoIndex` 設定false表示取消自動建立索引

- `db.native_parser` 

- `replset.strategy`

- `replset.rs_name`

- `server.auto_reconnect`

`callback<Function>` 連線錯誤時會有錯誤訊息顯示，也可以使用Event的方式得到錯誤訊息

```js
let db = mongoose.connection;
db.on('error', (err) => { console.log(err); });
```

**範例**

```js
const mongoose = require('mongoose');
let db = mongoose.connection;
db.once('open', () => { console.log('connect'); });
db.on('error', (err) => { console.log(err); });
db.on('close', () => { console.log('close'); });
const dbHost = 'localhost';
const dbPort = '27017';
const dbName = 'example-mongoose';

const uri = `mongodb://${dbHost}:${dbPort}/${dbName}`;
const options = {
    mongos: false,
    config: { autoIndex: false },
    server: { auto_reconnect: true }
}

mongoose.connect(uri, options, (err) => {
    console.log(err);
});
```


### 如何自動重新連線

```js
const mongoose = require('mongoose');
let db = mongoose.connection;

db.on('connected', () => {
    console.log('connected!');
});

db.on('disconnected', () => {
    console.log('disconnected!');
    setTimeout(dbConnect, 1000);
});

function dbConnect() {
    const dbHost = 'localhost';
    const dbPort = '27017';
    const dbName = 'example-mongoose';
    const uri = `mongodb://${dbHost}:${dbPort}/${dbName}`;
    const options = { server: { auto_reconnect: false } };
    mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, options);
}
dbConnect();

```

### 參考

|符號|解說|
|---|---|
|$gt|(>)大於|
|$lt|(<)小於|
|$gte|(>=)大於等於|
|$lte|(<=)小於等於|

