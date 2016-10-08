const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const Config = require('./config/config.json')[env];
// var models    = require('"../app/models');

console.log(Config);

let sequelize = new Sequelize(Config);


sequelize.sync({
    force: true
});

const Ticket = require('./models/ticket');
let ticket = new Ticket(sequelize);

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