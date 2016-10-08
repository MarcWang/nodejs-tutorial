"use strict";

var fs 		  = require("fs");
var path 	  = require("path");
var Sequelize = require("sequelize");
var env 	  = process.env.NODE_ENV || "development";
var config 	  = require(path.join(__dirname, '../config/config.json'))[env];
var sequelize = new Sequelize(
    config
);

sequelize.sync({
    force: true
});

var schemeString = "";

// Load Entities
var entities = [
    'ticket'
];

entities.forEach(function(model) {
  module.exports[model] = sequelize.import(path.join(__dirname, model));
});

//sequelize.sync({force:true})

module.exports.sequelize = sequelize;