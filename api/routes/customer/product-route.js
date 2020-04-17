const express = require('express');

const router = express.Router();

const productController = require('../../controllers/customer/product-controller');

router.get('/get', productController.getCustomerPurchasedProducts);

router.get('/getByProductNo/:productNo', productController.getPurchasedProductByProductNo);

router.get('/getByUuid/:uuid', productController.getPurchasedProductByUuid)

router.post('/addProduct', productController.postAddPurchasedProduct);

router.delete('/deleteByUuid/:uuid', productController.deletePurchasedProductByUuid);

router.post('/editByUuid/:uuid', productController.postEditPurchasedProductByUuid);

// ProductCategory
router.post('/addProductCategory', productController.postAddPurchasedProductCategory);

router.delete('/deleteProductCategory/:categoryId', productController.deletePurchasedProductCategory);


module.exports = router;