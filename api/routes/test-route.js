const express = require('express');
const auth = require('../middleware/auth-middleware'); // auth middleware
const user = require('../models/user-model');
const router = express.Router();
const db = require('../config/db');

// routes using controller as a logic.
router.get('/', (req, res, next) => {
    res.send('hello from test page');
})

router.get('/users', (req, res, next) => { // test route for fetch user data
    res.send(user.getUser());
})

module.exports = router;