const express = require('express');
const auth = require('../../middleware/root-auth-middleware');
const controller = require('../../controllers/retailer/retailer-auth-controller');
const router = express.Router();

router.post('/login', auth.login, controller.login);

module.exports = router;
