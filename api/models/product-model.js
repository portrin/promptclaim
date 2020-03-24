//const db = require('../config/db');

module.exports = class Product {
    constructor(serialNo, productNo, model, description, category, status, price, supplier) {
        this.serialNo = serialNo;
        this.productNo = productNo;
        this.model = model;
        this.description = description;
        this.category = category;
        this.status = status;
        this.price = price;
        this.supplier = supplier;
    }

    save() {
        return db.execute(
            'INSERT INTO products (serial_no, product_no, product_model, product_description, product_category, status, price, supplier_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [this.serialNo, 
            this.productNo,
            this.model,
            this.description,
            this.category,
            this.status,
            this.price,
            this.supplier]
        );
    }

    static deleteById(serialNo, productNo) {
        return db.execute(
            'DELETE FROM products WHERE products.serial_no = ? AND products.product_no = ?',
            [serialNo, productNo]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static findById(serialNo, productNo, cb) {
        return db.execute(
            'SELECT * FROM products WHERE products.serial_no = ? AND products.product_no = ?',
            [serialNo, productNo]
        );
    }
}