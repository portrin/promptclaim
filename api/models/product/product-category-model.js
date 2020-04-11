const db = require('../../config/db');
const Product = require('./product-model');
const checkType = require('../../utils');

module.exports = class ProductCategory {
    constructor ({categoryId=null, categoryName=null} = {}) {
        //class attribute
        this._categoryId = categoryId;
        this._categoryName = categoryName;

        //relationships
        this._product = null
    };

    //CRUD METHOD
    _create() {
        return db.execute(
            'INSERT INTO product_category(category_id, category_name) VALUES(?, ?)',
            [this._categoryId, this._categoryName]
        );
    };

    static _read() {
        return db.execute(
            'SELECT * FROM product_category'
        );
    };

    _update() {
        return db.execute(
            'UPDATE product_category SET category_name = ? WHERE category_id = ?',
            [this._categoryName, this._categoryId]
        );
    };

    _delete() {
        return db.execute(
            'DELETE FROM product_category WHERE category_id = ?',
            [this._categoryId]
        );
    };

//------------------------------------------------------------------------------------------------------------------------------------------
    //PROBLEM DOMAIN METHOD
    get getProperty () {
        return{
            categoryId: this._categoryId,
            categoryName: this._categoryName,

            product: this._product

        };
    };


    set setProperty ({
        categoryId = this._categoryId,
        categoryName = this._categoryName
    }) {
        checkType(categoryId, 'String');
        checkType(categoryName, 'String');

        this._categoryId = categoryId;
        this._categoryName = categoryName;
    };




    addProduct(product) {
        checkType(product, 'Product');
        this.product = product;
        return;
    };	
};