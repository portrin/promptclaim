const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class ClaimLog {
    constructor ({claim_id=null, timestamp=null, status=null} ={}) {
        // class attribute
        this._claimId = claim_id;
        this._status = status;
        this._timestamp = timestamp;
        // relationships
        this._purchasedProduct = null;      // relationship from purchasedProduct        
        this._serviceCenterBranch = null;   // relationship from serviceCenterBranch
    };
    // CRUD METHOD
    _create() {
        return db.execute(
            'INSERT INTO claim_log(claim_id, status, timestamp, uuid, service_center_id, branch_id) VALUES(?, ?, ?, ?, ?, ?, ?)',
            [this._claimId, 
            this.status, 
            this._timestamp, 
            this._purchasedProduct.getProperty.uuid,
            this._serviceCenterBranch.getProperty.serviceCenterId,
            this._serviceCenterBranch.getProperty.branchId
            ]
        );
    };

    _read() {
        return db.execute(
            'SELECT * FROM claim_log WHERE claim_id = ?',
            [this._claimId]
        )
    }

    static _read() {
        return db.execute(
            'SELECT * FROM claim_log'
        );
    };

    static _readByCustomerId(customerId) {
        return db.execute(
            'SELECT * FROM claim_log c NATURAL JOIN purchased_product p WHERE p.customer_id = ?',
            [customerId]
        );
    };

    static _readByPurchasedProductId(uuid) {
        return db.execute(
            'SELECT * FROM claim_log c NATURAL JOIN purchased_product p WHERE p.uuid = ?',
            [uuid]
        );
    }

    _update() {
        return db.execute(
            'UPDATE claim_log SET status = ? timestamp = ?, uuid = ?, service_center_id = ?, branch_id = ? WHERE claim_id = ?',
            [this._status, this._timestamp, this._uuid, this._serviceCenterBranch.getProperty.serviceCenterId, this._serviceCenterBranch.getProperty.branchId, this._claimId]
        );
    };

    _delete() {
        return db.execute(
            'DELETE FROM claim_log WHERE claim_id = ?',
            [this._claimId]
        );
    };

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