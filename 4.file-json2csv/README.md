# json2csv 使用方式

> JSON 轉成 CSV，使用的套件為[json2csv](https://github.com/zemirco/json2csv/tree/master)

## 安裝

``` sh
$npm install json2csv --save
```

## 範例

### 基本

``` js
const json2csv = require('json2csv');
const fs = require('fs');
const fields = ['car', 'price', 'color'];
const myCars = [{
    "car": "Audi",
    "price": 40000,
    "color": "blue"
}, {
    "car": "BMW",
    "price": 35000,
    "color": "black"
}, {
    "car": "Porsche",
    "price": 60000,
    "color": "green"
}];
const csv = json2csv({
    data: myCars,
    fields: fields
});
fs.writeFile('file.csv', csv, (err) => {
    if (err) throw err;
    console.log('file saved');
});
```

產生結果

``` text
"car","price","color"
"Audi",40000,"blue"
"BMW",35000,"black"
"Porsche",60000,"green"
```

---

### 中文

``` js
const fields_chinese = ['車款', '價位', '顏色'];
const cars_chinese = [{
    "車款": "奧迪",
    "價位": 40000,
    "顏色": "藍色"
}, {
    "車款": "寶馬",
    "價位": 35000,
    "顏色": "黑色"
}, {
    "車款": "保時捷",
    "價位": 60000,
    "顏色": "綠色"
}];
const csv_chinese = json2csv({
    data: cars_chinese,
    fields: fields_chinese
});
```

產生結果

``` text
"車款","價位","顏色"
"奧迪",40000,"藍色"
"寶馬",35000,"黑色"
"保時捷",60000,"綠色"
```

---

### 定義欄位名稱

``` js
const json2csv = require('json2csv');
const fs = require('fs');
const fields_defined_name = [{
    label: 'Car Name',
    value: 'car'
}, {
    label: 'Price USD',
    value: 'price'
}, {
    label: 'Car Color',
    value: 'color'
}];
const myCars = [{
    "car": "Audi",
    "price": 40000,
    "color": "blue"
}, {
    "car": "BMW",
    "price": 35000,
    "color": "black"
}, {
    "car": "Porsche",
    "price": 60000,
    "color": "green"
}];
const csv_defined_name = json2csv({ data: myCars, fields: fields_defined_name });
```

產生結果

``` text
"Car Name","Price USD","Car Color"
"Audi",40000,"blue"
"BMW",35000,"black"
"Porsche",60000,"green"
```

---

### 物件方式的欄位名稱

``` js
const fields_properties = ['car.make', 'car.model', 'price', 'color'];
const cars_properties = [{
    "car": { "make": "Audi", "model": "A3" },
    "price": 40000,
    "color": "blue"
}, {
    "car": { "make": "BMW", "model": "F20" },
    "price": 35000,
    "color": "black"
}, {
    "car": { "make": "Porsche", "model": "9PA AF1" },
    "price": 60000,
    "color": "green"
}];
const csv_properties = json2csv({
    data: cars_properties,
    fields: fields_properties
});
```

產生結果

``` text
"car.make","car.model","price","color"
"Audi","A3",40000,"blue"
"BMW","F20",35000,"black"
"Porsche","9PA AF1",60000,"green"
```