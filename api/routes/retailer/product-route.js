const express = require('express');
const controller = require('../../controllers/retailer/retailer-product-controller');
const router = express.Router();

router.get('/product/get', controller.getProduct);
router.get('/product/getByProductNo/:uuid', controller.getProductByUuid);
router.get('/product/getByCategory/:categoryId', controller.getProductByCategory);

module.exports = router;