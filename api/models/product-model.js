const db = require('../config/db')

module.exports = class Product {
    constructor(productNo, productName, productModel, productDescription) {
        this.productNo = productNo;
        this.productName = productName;
        this.productModel = productModel;
        this.productDescription = productDescription;
    };
};