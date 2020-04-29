const express = require('express');
const router = express.Router();
const claimLogController = require('../../controllers/customer/claim-log-controller');

router.get('/get', claimLogController.getCustomerClaimLog);

router.get('/getByUuid/:uuid', claimLogController.getProductClaimLogByUuid);

router.post('/add', claimLogController.postAddClaimLog);

router.post('/edit/:claimId', claimLogController.postEditClaimLog);

router.delete('/delete/:claimId', claimLogController.deleteClaimLog);

module.exports = router;
