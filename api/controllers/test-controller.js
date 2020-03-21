const express = require('express');
const mysql = require('mysql');
const config = require('../config/db');

// connect to mysql
const db = mysql.createConnection(config.setup);
db.connect((err) => {
    if (err) throw err;
    console.log('mysql connected as id ' + db.threadId);
});

// business logic prepared for routes
const hello = (req, res, next) => {
    res.send('hello from test page');
}

module.exports = {
    hello
}