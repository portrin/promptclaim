const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'promptclaim',
    password: 'Klodkup340'
});

module.exports = pool.promise();