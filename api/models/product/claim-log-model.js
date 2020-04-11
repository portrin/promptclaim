const db = require('../../config/db');
const PurchasedProduct = require('./purchased-product-model');
const checkType = require('../../utils');




module.exports = class ClaimLog {
    constructor ({claimId=null, timsestamp=null, status=null} ={}) {
        // class attribute
        this._claimId = claimId;
        this._timestamp = timsestamp;
        this._status = status;


        // relationships
        this._purchasedProduct = null;
        

        this._serviceCenterBranch = null; // from serviceCenterBranch
         

    };

    // CRUD METHOD
    _create() {
        return db.execute(
            'INSERT INTO claim_log(claim_id, status, timestamp, serial_no, product_no, service_center_id, branch_id) VALUES(?, ?, ?, ?, ?, ?, ?)',
            [this._claimId, 
            this.status, 
            this._timestamp, 
            this._purchasedProduct.getProperty.serialNo,
            this._purchasedProduct.getProperty.productNo,
            this._serviceCenterBranch.getProperty.serviceCenterId,
            this._serviceCenterBranch.getProperty.branchId
            ]
        );
    };

    _read() {
        return db.execute(
            'SELECT * FROM claim_log'
        );
    };

    static _readByCustomerId(customerId) {
        return db.execute(
            'SELECT c.claim_id, c.timestamp, c.status, p.serial_no, p.product_no, p.product_nickname, p.claim_qty, p.product_photo FROM claim_log c INNER JOIN purchased_product p ON c.serial_no=p.serial_no AND c.product_no=p.product_no WHERE p.customer_id = ?',
            [customerId]
        );
    };

    _update() {
        return db.execute(
            'UPDATE claim_log SET timestamp = ?, status = ? WHERE claim_id = ?',
            [this._timestamp, this._status, this._claimId]
        );
    };

    _delete() {
        return db.execute(
            'DELETE FROM claim_log WHERE claim_id = ?',
            [this._categoryId]
        );
    };


//-----------------------------------------------------------------------------------------------------------------------------------------
    // PROBLEM DOMAIN
    get getProperty() {
        return {
            claimId: this._claimId,
            timestamp: this._timestamp,
            status: this._status,

            purchasedPurduct: this._purchasedProduct,

            serviceCenter: this._serviceCenter

        };
    };

    set setProperty({
        claimId = this._claimId,
        timestamp = this._timestamp,
        status = this._status
    }) {
        checkType(claimId, 'String');
        checkType(timestamp, 'String');
        checkType(status, 'String');

        this._claimId = claimId;
        this._timestamp = timestamp;
        this._status = status
    };

    addPurchasedProduct(purhasedProduct) {
        checkType(purhasedProduct, 'PurchasedProduct');
        this._purchasedProduct = purhasedProduct;
        return;
    };

    addServiceCenterBranch(serviceCenterBranch) {
        checkType(serviceCenter, 'ServiceCenterBranch');
        this._serviceCenterBranch = serviceCenterBranch;
        return;
    }
};