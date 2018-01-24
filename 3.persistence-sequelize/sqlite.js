const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const Config = require('./config/config.json')[env];

console.log(Config);

let sequelize = new Sequelize(Config);


sequelize.sync({
    force: false
}).then(function(...params) {
    console.log('yes');
});

const Ticket = require('./models/ticket');
let ticket = new Ticket(sequelize);

var params = {
    title: "Awesome Tcicket1",
    desc: "Teste ticket1",
    avaliable: true
}

let model = ticket.build(params);
// console.log(model.dataValues);

model.save().then(function(...params) {
    // console.log(params);
}).catch((error) => {
    // console.log(error)
})

// ticket.findAll().then(function(values) {
//     console.log("Find All");
//     for (const value of values) {
//         console.log(value.dataValues);
//     }
// });

// ticket.findAll({ where: { title: 'Awesome Tcicket' } }).then(function(values) {
// 	console.log("Find All where spec title");
//     for (const value of values) {
//         console.log(value.dataValues);
//     }
// })

// ticket.findOne({ where: { title: 'Awesome Tcicket' } }).then(function(value) {
// 	console.log("Find One");
//     console.log(value.dataValues);
// })






// var schemeString = "";

// // Load Entities
// var entities = [
//     'ticket'
// ];


// entities.forEach(function(model) {
//   module.exports[model] = sequelize.import(path.join(__dirname, model));
// });

// //sequelize.sync({force:true})

// module.exports.sequelize = sequelize;
