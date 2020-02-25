const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Address = require('../models/Address');
const Tech = require('../models/Tech');

const models = [User, Address, Tech];

const connection = new Sequelize(dbConfig);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate(connection.models));

module.exports = connection;
