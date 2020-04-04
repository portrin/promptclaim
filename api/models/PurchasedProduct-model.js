const db = require('../config/db');
const Product = require('../models/Product-model')

module.exports = class PurchasedProduct extends Product {
    constructor(productNo, productName, productModel, productDescription, serialNo, price, invoiceID, isValidate, productPhoto, claimQty, timestamp, invoicePhoto, warrantyPhoto, policyStartDate, policyEndDate) {
        super(productNo, productName, productModel, productDescription);
        this.serialNo = serialNo;
        this.price = price;
        this.invoiceID = invoiceID;
        this.isValidate = isValidate;
        this.productPhoto = productPhoto;
        this.claimQty = claimQty;
        this.timestamp = timestamp;
        this.invoicePhoto = invoicePhoto;
        this.warrantyPhoto = warrantyPhoto;
        this.policyStartDate = policyStartDate;
        this.policyEndDate = policyEndDate;      
    }

    save() {
        return db.execute(
            'INSERT INTO purchased_product (serial_no, product_no, customer_id, price, invoice_id, timestamp, branch_id, retailer_id, receipt_photo, is_validate, product_photo, claim_qty, warranty_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.serialNo,
            this.productNo,
            //this.customerId,
            this.price,
            this.invoiceID,
            this.timestamp,
            //this.branchID,
            //this.retailerID,
            //this.receiptPhoto,
            this.isValidate,
            this.productPhoto,
            this.claimQty,
            this.warrantyPhoto
        ]
        );
    }

    update(serialNo, productNo) {
        return db.execute(
            'UPDATE purchased_product SET customer_id = ?, price = ?, invoice_id = ?, timestamp = ?, branch_id =?, retailer_id = ?, receipt_photo = ?, is_validate = ?, product_photo = ?, claim_qty = ?, warranty_photo = ? WHERE serial_no = ? AND product_no = ?  ',
            [//this.customerId,
            this.price,
            this.invoiceID,
            this.timestamp,
            //this.branchID,
            //this.retailerID,
            //this.receiptPhoto,
            this.isValidate,
            this.productPhoto,
            this.claimQty,
            this.warrantyPhoto,
            this.serialNo,
            this.productNo,   
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