const express = require('express');
//Customer Address controller
const controller = require('../../controllers/customer/customer-address-controller');
const router = express.Router();

//Customer address
router.get('/get', controller.getByCustomerId);
router.get('/getByAddressId/:addressId', controller.getByAddressId);
router.post('/edit/', controller.postEditByAddressId);
router.post('/add/', controller.postAddByAddressId);
router.delete('/delete/:addressId', controller.deleteByAddressId);

module.exports = router;