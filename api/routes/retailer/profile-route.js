const express = require('express');
const controller = require('../../controllers/retailer/retailer-profile-controller');
const router = express.Router();

router.get('/profile/get', controller.getProfile);
router.post('/profile/edit', controller.postEditProfile);
router.post('/profile/add', controller.postAddProfile);
router.delete('/profile/delete', controller.deleteProfile);

module.exports = router;