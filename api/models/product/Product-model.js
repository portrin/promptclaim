const db = require('../../config/db')

module.exports = class Product {
    constructor(productNo, productName, productModel, productDescription) {
        this._productNo = productNo;
        this._productName = productName;
        this._productModel = productModel;
        this._productDescription = productDescription;
    };
};