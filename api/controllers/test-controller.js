const express = require('express');

// business logic prepared for routes
const hello = (req, res, next) => {
    res.send('hello from test page');
}

module.exports = {
    hello
}