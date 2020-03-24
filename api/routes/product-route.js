const express = require('express');

const router = express.Router();

const productController = require('../controllers/product-controller');

router.get('/products', productController.getAllProducts);

router.get('/product/:prouctId',productController.getProduct);

router.post('/addProduct', productController.postAddProduct);

router.delete('/deleteProduct', productController.postDeleteProduct);

router.post('/editProduct', productController.postEditProduct);

router.get('/policy');

router.get('/policy/:policyId');

router.get('/policy/addPolicy');

router.get('/policy/deletePolicy');

router.get('/policy/editPolicy');

router.get('/policy/serviceCenters/');

router.get('/policy/serviceCenter');

module.exports = router;