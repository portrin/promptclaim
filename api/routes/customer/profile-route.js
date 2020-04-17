const express = require('express');
const router = express.Router();
const controller = require('../../controllers/customer/customer-profile-controller');

//router.post('/add', controller.postAddProfile);
router.get('/get', controller.getProfile);
router.post('/edit', controller.postEditProfile);

module.exports = router;