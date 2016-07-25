# Mongoose - Population

MongoDB是No-SQL的資料庫，如果想要在兩個Schema關聯性時

不支援`joins`

### 需求
- NodeJS 6.x
- Mongoose 4.x

### 誰需要使用`Population`
- 需要多次`query`資料庫才可以將資料完整彙整完成



```js
PersonModel
    .findOne(person)
    .populate('detail')
    .exec((err, personDetail) => {
    });
```


`populate`可以改成寫在Model中

```js
PersonModel
    .findOne(person)
    .exec((err, personDetail) => {
        if (err) return console.log(err);
    });

```

```js
const personSchema = Schema({
    name: { type: String, required: true, unique: true },
    detail: { type: String, ref: 'PersonDetail' }
});

function autoPopulate(next) {
    this.populate('detail');
    next();
};

personSchema
    .pre('findOne', autoPopulate)
    .pre('find', autoPopulate);

```


可以使用[mongoose-autopopulate](https://github.com/mongodb-js/mongoose-autopopulate)加入mongoose plugin

[mongoose-schema-extend](https://github.com/briankircho/mongoose-schema-extend)