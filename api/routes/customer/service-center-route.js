const express = require('express');
const serviceCenterController = require('../../controllers/customer/service-center-controller');
const router = express.Router();

router.get('/serviceCenter/getByUuid/:uuid', serviceCenterController.getServiceCenterByUuid);

router.get('/serviceCenter/getByPolicyId/:policyId', serviceCenterController.getServiceCenterByPolicyId);

module.exports = router;