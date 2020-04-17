const express = require('express');
const controller = require('../../controllers/retailer/retailer-policy-controller');
const router = express.Router();

router.get('/policy/get', controller.getPolicy);

module.exports = router;