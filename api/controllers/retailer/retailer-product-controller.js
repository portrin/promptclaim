const PurchasedProduct = require('../../models/product/purchased-product-model');
const jwt = require('jsonwebtoken')

exports.getProduct = async (req, res, next) => {
    const retailerId = jwt.decode(req.headers.authorization).sub;
    const purchasedProduct = (await PurchasedProduct._readByRetailerId(retailerId))[0];
    console.log(purchasedProduct);
    res.send(purchasedProduct);
};

exports.getProductByUuid = async (req, res, next) => {
    const retailerId = jwt.decode(req.headers.authorization).sub;
    const uuid = req.params.uuid;
    const purchasedProduct = (await PurchasedProduct._readByUuidRetailer(uuid, retailerId))[0];
    console.log(purchasedProduct);
    res.send(purchasedProduct);
};

exports.getProductByCategory = async (req, res, next) => {
    const retailerId = jwt.decode(req.headers.authorization).sub;
    const categoryId = req.params.categoryId;
    const purchasedProduct = (await PurchasedProduct._readByCategoryIdRetailer(categoryId, retailerId))[0];
    console.log(purchasedProduct);
    res.send(purchasedProduct);
};