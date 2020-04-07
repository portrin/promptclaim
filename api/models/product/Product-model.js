const db = require('../../config/db')
const ProductCategory = require('./product-category-model');

module.exports = class Product {
    constructor(productNo, productName, productModel, productDescription) {
        this._productNo = productNo || null;
        this._productName = productName || null;
        this._productModel = productModel || null;
        this._productDescription = productDescription || null;
        this._productCategory = null;

        this._supplierId = null;
    };
    
    //CRUD METHOD
    _create() {
        return db.execute(
            'INSERT INTO product (product_no, product_name, product_model, product_description) VALUES (?, ?, ?, ?)',
            [this._productNo,
            this._productName,
            this._productModel,
            this._productDescription]
        );
    };

    static _read() {
        return db.execute(
            'SELECT * FROM product'
        );
    };

    _update() {
        return db.execute(
            'UPDATE product SET product_name = ?, product_model = ?, product_description = ? WHERE product_no = ?',
            [this._productName,
            this._productModel,
            this.productDescription,
            this.product_no]
        );
    };

    _delete() {
        return db.execute(
            'DELETE FROM product WHERE product_no = ?',
            [this._productNo]
        );
    };


    //PROBLEM DOMAIN METHOD
        
};