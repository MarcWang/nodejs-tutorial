const json2csv = require('json2csv');
const fs = require('fs');

// basic
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
console.log(csv);
fs.writeFile('file.csv', csv, (err) => {
    if (err) throw err;
    console.log('file saved');
});


// chinese
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
console.log(csv_chinese);
fs.writeFile('file_chinese.csv', csv_chinese, (err) => {
    if (err) throw err;
    console.log('file saved');
});

// custom column names
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
const csv_defined_name = json2csv({ data: myCars, fields: fields_defined_name });
console.log(csv_defined_name);
fs.writeFile('file_defined_name.csv', csv_defined_name, (err) => {
    if (err) throw err;
    console.log('file saved');
});

// specify nested properties
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
console.log(csv_properties);

fs.writeFile('file_properties.csv', csv_properties, (err) => {
    if (err) throw err;
    console.log('file saved');
});