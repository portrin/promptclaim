const express = require('express');
//Customer Address controller
const controller = require('../../controllers/customer/customer-address-controller');
const router = express.Router();

//Customer address
router.post('/add/:addressId', controller.postAddAddressByPK);
router.get('/get', controller.getAddressByCustId);
router.get('/getByAddressId/:addressId', controller.getAddressByPK);
router.post('/edit/:addressId', controller.postEditAddressByPK);
router.delete('/delete/:addressId', controller.deleteAddressByPK);

module.exports = router;