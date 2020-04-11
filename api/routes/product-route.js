const express = require('express');

const router = express.Router();

const productController = require('../controllers/product-controller');

router.get('/products', productController.getAllProducts);

router.get('/:serialNo&:productNo',productController.getProduct);

router.post('/addProduct', productController.postAddProduct);

router.get('/getAddProduct', productController.getAddProduct);

router.delete('/deleteProduct/:serialNo&:productNo', productController.deleteProduct);

router.post('/editProduct/:serialNo&:productNo', productController.postEditProduct);




module.exports = router;