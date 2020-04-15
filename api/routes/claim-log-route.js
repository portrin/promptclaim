const express = require('express');
const router = express.Router();
const claimLogController = require('../controllers/claim-log-controller');

router.get('/get', claimLogController.getCustomerClaimLog);

router.get('/getByUuid/:uuid', claimLogController.getProductClaimLog);

router.post('/add', claimLogController.postAddClaimLog);

router.post('/edit/:claimId', claimLogController.postEditClaimLog);

router.delete('/delete/:claimId', claimLogController.deleteClaimLog);

module.exports = router;
