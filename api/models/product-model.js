const db = require('../config/db');

module.exports = class Product {
    constructor(serialNo, productNo, accountID, price, invoiceID, timestamp, branchID, retailerID, receiptPhoto, isValidate, productPhoto, claimQty) {
        this.serialNo = serialNo;
        this.productNo = productNo;
        this.accountID = accountID;
        this.price = price;
        this.invoiceID = invoiceID;
        this.timestamp = timestamp;
        this.branchID = branchID;
        this.retailerID = retailerID;
        this.receiptPhoto = receiptPhoto;
        this.isValidate = isValidate;
        this.productPhoto = productPhoto;
        this.claimQty = claimQty;
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
            this.branchID,
            this.retailerID,
            this.receiptPhoto,
            this.isValidate,
            this.productPhoto,
            this.claimQty
        ]
        );
    }

    update(serialNo, productNo) {
        return db.execute(
            'UPDATE purchased_product SET account_id = ?, price = ?, invoice_id = ?, timestamp = ?, branch_id =?, retailer_id = ?, receipt_photo = ?, is_validate = ?, product_photo = ?, claim_qty = ? WHERE serial_no = ? AND product_no = ?  ',
            [this.accountID,
            this.price,
            this.invoiceID,
            this.timestamp,
            this.branchID,
            this.retailerID,
            this.receiptPhoto,
            this.isValidate,
            this.productPhoto,
            this.claimQty,
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