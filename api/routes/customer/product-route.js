const express = require('express');

const router = express.Router();

const productController = require('../../controllers/customer/product-controller');

router.get('/get', productController.getCustomerProducts);

router.get('/getByProductNo/:productNo', productController.getProductByProductNo);

router.get('/getByUuid/:uuid', productController.getProductByUuid)

router.post('/addProduct', productController.postAddProduct);

router.delete('/deleteByUuid/:uuid', productController.deleteProductByUuid);

router.post('/editByUuid/:uuid', productController.postEditProductByUuid);


module.exports = router;