const express = require('express');
const profileRoute = require('./profile-route');
const accountRoute = require('./customer-account-route')
const addressRoute = require('./customer-address-route');
const productRoute = require('./product-route');
const claimLogRoute = require('./claim-log-route');
const notificationRoute = require('./notification-route');
const policyRoute = require('./policy-route');
const serviceCenterRoute = require('./service-center-route');
const authRoute = require('./auth-route');
const auth = require('../../middleware/auth-middleware');
router = express.Router();

router.use('/account/add', accountRoute)

router.use('/account', auth.requireJwtAuth, accountRoute);
router.use('/profile', auth.requireJwtAuth, profileRoute);
router.use('/address', auth.requireJwtAuth, addressRoute);
router.use('/product', auth.requireJwtAuth, productRoute);
router.use('/claimLog', auth.requireJwtAuth, claimLogRoute);
router.use('/notification', auth.requireJwtAuth, notificationRoute);
router.use('/policy', auth.requireJwtAuth, policyRoute);
router.use('/serviceCenter', auth.requireJwtAuth, serviceCenterRoute);
router.use('/auth', authRoute);

module.exports = router;