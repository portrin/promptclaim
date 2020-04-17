const express = require('express');
const controller = require('../../controllers/retailer/retailer-profile-controller');
const router = express.Router();

router.get('/get', controller.getProfile);

router.post('/edit', controller.postEditProfile);

router.post('/add', controller.postAddProfile);

router.delete('/delete', controller.deleteProfile);


module.exports = router;