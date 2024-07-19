const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: process.env.DIALECT,
    }
    
    
);

module.exports = connection;