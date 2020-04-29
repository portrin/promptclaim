const express = require('express');
const controller = require('../../controllers/retailer/retailer-profile-controller');
const addController = require('../../controllers/retailer/retailer-add-profile-controller')
const router = express.Router();

router.post('/:retailerId', addController.postAddProfile);

router.get('/get', controller.getProfile);
router.post('/edit', controller.postEditProfile);
router.delete('/delete', controller.deleteProfile);


module.exports = router;