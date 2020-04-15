const express = require('express');
//Customer Address controller
const controller = require('../../controllers/customer/customer-address-controller');
const router = express.Router();

//Customer address
router.post('/addAddressById/:addrId', controller.postAddAddressById);
router.get('/getAddressByCustId', controller.getAddressByCustId);
router.get('/getAddressByPK/:addrId', controller.getAddressByPK);
router.post('/editAddressById/:addrId', controller.editAddressById);
router.delete('/deleteAddressByPK/:addrId', controller.deleteAddressByPK);

module.exports = router;