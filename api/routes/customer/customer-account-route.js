const express = require('express');
//Customer Address controller
const controller = require('../../controllers/customer/customer-account-controller');
const router = express.Router();

//Customer address
router.post('/add/:accountId', controller.postAddAccount);
router.get('/get', controller.getAccount);
router.post('/edit', controller.postEditAccount);
//router.delete('/delete', controller.deleteAccount);

module.exports = router;