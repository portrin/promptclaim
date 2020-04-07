const db = require('../../config/db');
const Product = require('./product-model')

module.exports = class PurchasedProduct extends Product {
    constructor(productNo, productName, productModel, productDescription, serialNo, price, invoiceID, isValidate, productPhoto, claimQty, timestamp, invoicePhoto, warrantyPhoto  ) {
        super(productNo, productName, productModel, productDescription); 

        this._serialNo = serialNo || null;
        this._price = price || null;
        this._invoiceId = invoiceID || null;
        this._isValidate = isValidate || null;
        this._productPhoto = productPhoto || null;
        this._claimQty = claimQty || null;
        this._timestamp = timestamp || null;
        this._invoicePhoto = invoicePhoto || null;
        this._warrantyPhoto = warrantyPhoto || null;


        this._customerId = null;
        
        this._policyStartDate = null; //from policy class
        this._policyEndDate = null; //from policy class

        this._retailerId = null; //from retailer branch
        this._branchId = null; //from retailer branch
        

    }
    


    //CRUD method
    _create() {
        console.log(this);
        return db.execute(
            'INSERT INTO purchased_product (serial_no, product_no, customer_id, price, invoice_id, timestamp, branch_id, retailer_id, receipt_photo, is_validate, product_photo, claim_qty, warranty_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this._serialNo,
            this._productNo,
            this._customerId,
            this._price,
            this._invoiceId,
            this._timestamp,
            this._branchId,
            this._retailerId,
            this._invoicePhoto,
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
