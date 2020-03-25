const express = require('express');
const userController = require('../controllers/user-controller');
const router = express.Router();

//get search User id
router.get('/userInfoById/:id', userController.getUserInfoById);

//PUT --> update
router.put('/editUserById/:id', userController.editUserById);

module.exports = router