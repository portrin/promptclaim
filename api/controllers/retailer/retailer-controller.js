const Retailer = require('../../models/policy-owner/retailer/retailer-model');
const PurchasedProduct = require('../../models/product/purchased-product-model');
const Policy = require('../../models/policy/policy-model');

exports.getProfile = async (req, res, next) => {
    //const retailerId = ...
    const retailer = (await Retailer._readByRetailerId(retailerId))[0];
    console.log(retailer);
    if (retailer) {
        res.send(retailer);
    } else {
        res.send('No retailer exists!');
    }
};

exports.postEditProfile = async (req, res, next) => {
    //const retailerId = ...
    const name = req.body.name;
    const retailerDescription = req.body.retailerDescription;
    const contact = req.body.contact;
    const hqAddress = req.body.hqAddress;
    const rootId = req.body.rootId;
    const policyOwnerId = req.body.policyOwnerId;
    const retailer = new Retailer(retailerId, name, retailerDescription, contact, hqAddress, rootId, policyOwnerId);
    const result = await retailer._update();
    console.log(result);
    res.send(result);
};

exports.postAddProfile = async (req, res, next) => {
    //const retailerId = ...
    const name = req.body.name;
    const retailerDescription = req.body.retailerDescription;
    const contact = req.body.contact;
    const hqAddress = req.body.hqAddress;
    const rootId = req.body.rootId;
    const policyOwnerId = req.body.policyOwnerId;
    const retailer = new Retailer(retailerId, name, retailerDescription, contact, hqAddress, rootId, policyOwnerId);
    const result = await retailer._create();
    console.log(result);
    res.send(result);
};

exports.deleteProfile = async (req, res, next) => {
    //const retailerId = ...
    const result = await Retailer._delete(retailerId);
    console.log(result);
    res.send(result);
};

exports.getProduct = async (req, res, next) => {
    //const retailerId = ...
    const purchasedProduct = (await PurchasedProduct._readByRetailerId(retailerId))[0];
    console.log(purchasedProduct);
    res.send(purchasedProduct);
};

exports.getProductByUuid = async (req, res, next) => {
    //const retailerId = ...
    const uuid = req.params.uuid;
    const purchasedProduct = (await PurchasedProduct._readByUuidRetailer(uuid, retailerId))[0];
    console.log(purchasedProduct);
    res.send(purchasedProduct);
};

exports.getProductByCategory = async (req, res, next) => {
    //const retailerId = ...
    const categoryId = req.params.categoryId;
    const purchasedProduct = (await PurchasedProduct._readByCategoryIdRetailer(categoryId, retailerId))[0];
    console.log(purchasedProduct);
    res.send(purchasedProduct);
};

exports.getPolicy = async (req, res, next) => {
    //const retailerId = ...
    const policy = (await Policy._readByRetailerId(retailerId))[0];
    console.log(policy);
    res.send(policy);
};