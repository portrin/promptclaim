const express = require('express');
const customerController = require('../controllers/customer-controller');

//Customer Address controller
const customerAddressController = require('../controllers/customer-address-controller')

const router = express.Router();

//No id input, please sign in
router.get('', customerController.userDefault);

//get search User id : take data from server
router.get('/userInfoById', customerController.getUserInfoId);

//PUT --> update / post : give data to server
router.get('/editProfileById/:custId', customerController.editProfile);

//Customer address
router.post('/addAddressById/:addrId', customerAddressController.postAddAddressById);
router.get('/getAddressByCustId', customerAddressController.getAddressByCustId);
router.get('/getAddressByPK/:addrId', customerAddressController.getAddressByPK);
router.post('/editAddressById/:addrId', customerAddressController.postEditAddressById);
router.delete('/deleteAddressByPK/:addrId', customerAddressController.deleteAddressByPK);

module.exports = router