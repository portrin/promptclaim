const db = require('../../config/db');
const Product = require('./product-model');

module.exports = class ProductCategory {
    constructor (categoryId, categoryName) {
        this._categoryId = categoryId;
        this._categoryName = categoryName;
        this._product;
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


    //PROBLEM DOMAIN METHOD

	
};