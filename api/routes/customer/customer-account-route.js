const express = require('express');
//Customer Account controller
const controller = require('../../controllers/customer/customer-account-controller');
const addController = require('../../controllers/customer/customer-add-account-controller')
const router = express.Router();

//Customer account
router.post('', addController.postAddAccount);
router.get('/get', controller.getAccount);
router.post('/edit', controller.postEditAccount);
//router.delete('/delete', controller.deleteAccount);

module.exports = router;