const db = require('../../config/db')
const checkType = require('../../utils').checkType;

module.exports = class Product {
    constructor({product_no=null, product_name=null, product_model=null, product_description=null} = {}) {
        // class attribute
        this._productNo = product_no;
        this._productName = product_name;
        this._productModel = product_model;
        this._productDescription = product_description;
        // relationships
        this._productCategory = [];
        this._supplier = null;
    };
    
    //CRUD METHOD
    _create() {
        return db.execute(
            'INSERT INTO product (product_no, product_name, product_model, product_description, supplier_id) VALUES (?, ?, ?, ?)',
            [this._productNo,
            this._productName,
            this._productModel,
            this._productDescription,
            this._supplier.getProperty.supplierId]
        );
    };

    _read() {
        return db.execute(
            'SELECT * FROM product'
        )
    }

    static _readByProductNo(productNo) {
        return db.execute(
            'SELECT * FROM product WHERE product_no = ?',
            [productNo]
        );
    };

    _update() {
        return db.execute(
            'UPDATE product SET product_name = ?, product_model = ?, product_description = ?, supplier_id = ? WHERE product_no = ?',
            [this._productName,
            this._productModel,
            this.productDescription,
            this._supplier.getProperty.supplierId,
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
    get getProperty() {
        return {
            productNo: this._productNo,
            productName: this._productName,
            productModel: this._productModel,
            productDescription: this._productDescription,
            productCategory: this._productCategory,
            supplier: this._supplier
        };
    };

    set setProperty({
        // set its own property
        // destructuring object as parameter by using old values as a default.
        productNo = this._productNo,
        productName = this._productName,
        productModel = this._productModel,
        productDescription = this._productDescription
    }) {
        //checktype
        checkType(productNo, 'String');
        checkType(productName, 'String');
        checkType(productModel, 'String');
        checkType(productDescription, 'String');
        //assign to private attribute
        this._productNo = productNo;
        this._productName = productName;
        this._productModel = productModel;
        this._productDescription = productDescription;
    };

    addProductCategory(productCategory) {
        checkType(productCategory, 'ProductCategory');
        this._productCategory.push(productCategory);
        return;
    };

    addSupplier(supplier) {
        checkType(supplier, 'Supplier');
        this._supplier = supplier;
        return;
    }
};