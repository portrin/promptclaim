const express = require('express');
const controller = require('../../controllers/customer/profile-controller');
router = express.Router();

router.get('/get', controller.getByCustomerId);
router.post('/edit', controller.postEditByCustomerId);
// router.post('/add', controller.postAddByCustomerId); 

module.exports = router;

