const express = require('express');
const controller = require('../../controllers/retailer/retailer-product-controller');
const router = express.Router();

router.get('/get', controller.getProduct);

router.get('/getByProductNo/:uuid', controller.getProductByUuid);

router.get('/getByCategory/:categoryId', controller.getProductByCategory);

module.exports = router;