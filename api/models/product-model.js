const db = require('../config/db')

module.exports = class Product {
    constructor(productNo, productName, productModel, productDescription, productCategory) {
        this.productNo = productNo;
        this.productName = productName;
        this.productModel = productModel;
        this.productDescription = productDescription;
        this.productCategory = productCategory;
    };

    // static getProductNo() {
    //     db.execeute
    //     return this.productNo;
    // };

    // static getProductName() {
    //     return this.productName;
    // };

    // static getProductModel() {
    //     return this.productModel;
    // };

    // static getProductDescription() {
    //     return this.productDescription;
    // }
};