const Sequelize = require('Sequelize');

var sequelize = new Sequelize('mysql', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

var Project = sequelize.define('project', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT
})

var project = Project.build({ title: 'very important task' })
// console.log(project)

project.save();
