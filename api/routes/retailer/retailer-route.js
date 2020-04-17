const express = require('express');
const router = express.Router();

const profileRoute = require('./retailer-profile-route');
const productRoute = require('./retailer-product-route');
const policyRoute = require('./retailer-policy-route');

const authRoute = require('./retailer-auth-route');
const auth = require('../../middleware/auth-middleware');

router.use('/profile', auth.requireJwtAuth, profileRoute);
router.use('/product', auth.requireJwtAuth, productRoute);
router.use('/policy', auth.requireJwtAuth, policyRoute);
router.use('/auth', authRoute);

module.exports = router;
