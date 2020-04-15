const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class ProductCategory {
    constructor ({category_id=null, category_name=null} = {}) {
        //class attribute
        this._categoryId = category_id;
        this._categoryName = category_name;
        //relationships
        this._product = []; //from product class
        this._purchasedProduct = []; //from purchasedProduct class
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

    static _readByCategoryId(categoryId) {
        return db.execute(
            'SELECT * FROM product_category WHERE category_id = ?',
            [categoryId]
        )
    }

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
    get getProperty () {
        return{
            categoryId: this._categoryId,
            categoryName: this._categoryName,
            product: this._product,
            purchasedProduct: this._purchasedProduct
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

};