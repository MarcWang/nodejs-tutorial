"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize) {

    var Ticket = sequelize.define('ticket', {
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
        },
        {
            freezeTableName: true // Model tableName will be the same as the model name
        }
    ); return Ticket;
};