const express = require('express');
const serviceCenterController = require('../../controllers/customer/service-center-controller');
const router = express.Router();

router.get('/getByUuid/:uuid', serviceCenterController.getServiceCenterByUuid);

router.get('/getByPolicyId/:policyId', serviceCenterController.getServiceCenterByPolicyId);

module.exports = router;