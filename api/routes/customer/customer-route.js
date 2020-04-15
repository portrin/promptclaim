const express = require('express');
const profileRoute = require('./profile-route');
const addressRoute = require('./customer-address-route');
const productRoute = require('./product-route');
const claimLogRoute = require('./claim-log-route');
const notificationRoute = require('./notification-route');
const policyRoute = require('./policy-route');
const serviceCenterRoute = require('./service-center-route');
const authRoute = require('./auth-route');
router = express.Router();

router.use('/profile', profileRoute);
router.use('/address', addressRoute);
router.use('/product', productRoute);
router.use('/claimLog', claimLogRoute);
router.use('/notification', notificationRoute);
router.use('/policy', policyRoute);
router.use('/serviceCenter', serviceCenterRoute);
router.use('/auth', authRoute);

module.exports = router;