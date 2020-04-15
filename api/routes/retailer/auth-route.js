const express = require('express');
const auth = require('../middleware/auth-middleware');
const controller = require('../controllers/auth-controller');
const router = express.Router();

router.post('/login', auth.login, controller.login);

module.exports = router;
