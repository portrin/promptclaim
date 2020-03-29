const express = require('express');
const userController = require('../controllers/user-controller');
const router = express.Router();

//use this as middleware
const bodyparser = require('body-parser');

//No id input, please sign in
router.get('', userController.userDefault);

//get search User id : take data from server
router.get('/userInfoById/:id', userController.getUserInfoId);

//PUT --> update / post : give data to server
router.get('/editUserById/:id', userController.editUserById);

module.exports = router