const db = require('../config/db');

module.exports = class Product {
    constructor(serialNo, productNo, accountID, price, invoiceID, timestamp, branch_id, retailer_id, receipt_photo, is_validate, product_photo, claim_qty) {
        this.serialNo = serialNo;
        this.productNo = productNo;
        this.accountID = accountID;
        this.price = price;
        this.invoiceID = invoiceID;
        this.timestamp = timestamp;
        this.branch_id = branch_id;
        this.retailer_id = retailer_id;
        this.receipt_photo = receipt_photo;
        this.is_validate = is_validate;
        this.product_photo = product_photo;
        this.claim_qty = claim_qty;
    }

    save() {
        return db.execute(
            'INSERT INTO purchased_product (serial_no, product_no, account_id, price, invoice_id, timestamp, branch_id, retailer_id, receipt_photo, is_validate, product_photo, claim_qty) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.serialNo,
            this.productNo,
            this.accountID,
            this.price,
            this.invoiceID,
            this.timestamp,
            this.branch_id,
            this.retailer_id,
            this.receipt_photo,
            this.is_validate,
            this.product_photo,
            this.claim_qty]
        );
    }

    update(serialNo, productNo) {
        return db.execute(
            'UPDATE products SET serial_no = ?, product_no = ?, account_id = ?, price_id = ?, invoice_id = ?, timestamp = ?, branch_id =?, retailer_id = ?, receipt_photo = ?, is_validated = ?, product_photo = ?, claim_qty = ? WHERE serial_no = ? AND product_no = ?  ',
            [this.serialNo,
            this.productNo,
            this.accountID,
            this.price,
            this.invoiceID,
            this.timestamp,
            this.branch_id,
            this.retailer_id,
            this.receipt_photo,
            this.is_validate,
            this.product_photo,
            this.claim_qty,
            this.serialNo,
            this.productNo    
        ]
        );              
    };

    static deleteById(serialNo, productNo) {
        return db.execute(
            'DELETE FROM purchased_product WHERE purchased_product.serial_no = ? AND purchased_product.product_no = ?',
            [serialNo, productNo]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM purchased_product');
    }

    static findById(serialNo, productNo) {
        return db.execute(
            'SELECT * FROM purchased_product WHERE purchased_product.serial_no = ? AND purchased_product.product_no = ?',
            [serialNo, productNo]
        );
    }
}