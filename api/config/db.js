const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    setup: {
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE,
        port: process.env.DB_PORT
    }
};
// connect to mysql
const db = mysql.createPool(config.setup).promise();

module.exports = db;