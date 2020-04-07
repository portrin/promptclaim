const db = require('../config/db');
const Product = require('./product-model')

module.exports = class PurchasedProduct extends Product {
    constructor(productName, serialNo, productDescription, productNo, price, invoiceID, isValidate, productPhoto, claimQty, timestamp, invoicePhoto, warrantyPhoto  ) {
        super(productNo, productName, productModel, productDescription); 
        
        this._retilerId; //from retailer branch
        this._retailerBranch; //from retailer branch

        this._serialNo = serialNo;
        this._price = price;
        this._invoiceID = invoiceID;
        this._isValidate = isValidate;
        this._productPhoto = productPhoto;
        this._claimQty = claimQty;
        this._timestamp = timestamp;
        this._invoicePhoto = invoicePhoto;
        this._warrantyPhoto = warrantyPhoto;


        this._customerId;


        this._policyStartDate; //from policy class
        this._policyEndDate; //from policy class


    }
    


    //CRUD method
    _create() {
        return db.execute(
            'INSERT INTO purchased_product (serial_no, product_no, customer_id, price, invoice_id, timestamp, branch_id, retailer_id, receipt_photo, is_validate, product_photo, claim_qty, warranty_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this._serialNo,
            this._productNo,
            this._customerId,
            this._price,
            this._invoiceID,
            this._timestamp,
            this._branchID,
            this._retailerID,
            this._receiptPhoto,
            this._isValidate,
            this._productPhoto,
            this._claimQty,
            this._warrantyPhoto
        ]
        );
    }

    static _read() {
        return db.execute(
            'SELECT * FROM purchased_product NATURAL JOIN product'
            );
    }

    // static _readById(serialNo, productNo) {
    //     return db.execute(
    //         'SELECT * FROM purchased_product WHERE purchased_product.serial_no = ? AND purchased_product.product_no = ?',
    //         [serialNo, productNo]
    //     );
    // }

    // static _readByName(productName) {
    //     return db.execute(
    //         'SELECT * FROM purchased_product NATURAL JOIN product WHERE product.product_name LIKE ?',
    //         ['%' + productName + '%']
    //     );
    // }

    // static _readBySerialNo(serialNo) {
    //     return db.execute(
    //         'SELECT * FROM purchased_product NATURAL JOIN product WHERE serial_no LIKE ?',
    //         [serialNo + '%']
    //     );
    // }

    _update() {
        return db.execute(
            'UPDATE purchased_product SET customer_id = ?, price = ?, invoice_id = ?, timestamp = ?, branch_id =?, retailer_id = ?, receipt_photo = ?, is_validate = ?, product_photo = ?, claim_qty = ?, warranty_photo = ? WHERE serial_no = ? AND product_no = ?  ',
            [this._customerId,
            this._price,
            this._invoiceID,
            this._timestamp,
            this._branchID,
            this._retailerID,
            this._receiptPhoto,
            this._isValidate,
            this._productPhoto,
            this._claimQty,
            this._warrantyPhoto,
            this._serialNo,
            this._productNo,   
        ]
        );              
    };

    _delete() {
        return db.execute(
            'DELETE FROM purchased_product WHERE purchased_product.serial_no = ? AND purchased_product.product_no = ?',
            [this._serialNo, this._productNo]
        );
    }   
};
