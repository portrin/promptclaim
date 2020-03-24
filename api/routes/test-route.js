const express = require('express');
const auth = require('../middleware/auth-middleware'); // auth middleware
const controller = require('../controllers/test-controller'); // test controller
const router = express.Router();
// const db = require('../config/db');

// routes using controller as a logic.
router.get('/', controller.hello);
router.get('/users', controller.getUser);

module.exports = router;