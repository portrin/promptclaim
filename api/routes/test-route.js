const express = require('express');
const controller = require('../controllers/test-controller');
const router = express.Router();

// routes using controller as a logic.
router.get('/', controller.hello);

module.exports = router;