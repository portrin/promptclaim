const express = require('express');

const router = express.Router();

router.get('/products');

router.get('/product/:prouctId');

router.post('/add-product');

router.delete('/delete-product');

router.post('/edit-product');

router.get('/policy/policies');

router.get('/policy/policy/:policyId');

router.get('/policy/add-policy');

router.get('/policy/delete-policy');

router.get('/policy/edit-policy');

router.get('/policy/service-centers/');

router.get('/policy/service-center');

module.exports = router;