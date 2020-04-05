const db = require('../config/db')
const ProductCategory = require('./ProductCategory-model');

module.exports = class Product {
    constructor() {
        this._productNo = productNo;
        this._productName = productName;
        this._productModel = productModel;
        this._productDescription = productDescription;
        this._productCategory = new ProductCategory();
    };

    
    
};