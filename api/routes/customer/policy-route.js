const express = require('express');
const policyController = require('../../controllers/customer/policy-controller');
const router = express.Router();

router.get('/get', policyController.getPolicy);

router.get('/getByUuid/:uuid', policyController.getPolicyByUuid);

router.post('/addPolicyToProduct/:uuid', policyController.postAddProductHasPolicy);

module.exports = router;