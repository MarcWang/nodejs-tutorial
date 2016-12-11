const Sequelize = require('Sequelize');

var sequelize = new Sequelize('sys', 'root', '2511213', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

// sequelize.sync({
//     force: false
// }).then(function(...params) {
//     console.log('yes');
// });

function City(sequelize) {
    var City = sequelize.define('sys_config', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        desc: {
            type: Sequelize.STRING,
            allowNull: false
        },
        avaliable: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        bought: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        defaultScope: {
            where: {
                active: true
            }
        }
    });
    return City;
};


let cityProject = new City(sequelize);

// var params = {
//     title: "Awesome Tcicket1",
//     desc: "Teste ticket1",
//     avaliable: true
// }

// let model = ticket.build(params);
// // console.log(model.dataValues);

// model.save().then(function(...params) {
//     console.log(params);
// }).catch((error) => {
//     // console.log(error)
// })


cityProject.findAll().then(function(values) {
    console.log("Find All");
    for (const value of values) {
        console.log(value.dataValues);
    }
});
