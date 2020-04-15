const express = require('express');
const policyController = require('../../controllers/policy-controller');
const router = express.Router();

router.get('/policy/get', policyController.getPolicy);

router.get('/policy/getByUuid/:uuid', policyController.getPolicyByUuid);

module.exports = router;