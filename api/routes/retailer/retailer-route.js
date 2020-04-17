const express = require('express');
const retailerController = require('../../controllers/retailer/retailer-controller');
const router = express.Router();

router.get('/profile/get', retailerController.getProfile);

router.post('/profile/edit', retailerController.postEditProfile);

router.post('/profile/add', retailerController.postAddProfile);

router.delete('/profile/delete', retailerController.deleteProfile);

router.get('/product/get', retailerController.getProduct);

router.get('/product/getByProductNo/:uuid', retailerController.getProductByUuid);

router.get('/product/getByCategory/:categoryId', retailerController.getProductByCategory);

router.get('/policy/get', retailerController.getPolicy);

module.exports = router;