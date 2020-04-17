const express = require('express');
//Customer Address controller
const controller = require('../../controllers/customer/customer-address-controller');
const router = express.Router();

//Customer address
router.post('/addByPK/:addressId', controller.postAddAddressByPK);
router.get('/getByCustId', controller.getAddressByCustId);
router.get('/getByPK/:addressId', controller.getAddressByPK);
router.post('/editByPK/:addressId', controller.postEditAddressByPK);
router.delete('/deleteByPK/:addressId', controller.deleteAddressByPK);

module.exports = router;