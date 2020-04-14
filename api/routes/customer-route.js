const express = require('express');
const customerController = require('../controllers/customer-controller');
const router = express.Router();

//No id input, please sign in
router.get('', customerController.userDefault);

//get search User id : take data from server
router.get('/userInfoById', customerController.getUserInfoId);

//PUT --> update / post : give data to server
router.get('/editProfileById/:custId', customerController.editProfile);

router.get('/editAddressById/:custId/:addrId', customerController.editAddressById);

module.exports = router