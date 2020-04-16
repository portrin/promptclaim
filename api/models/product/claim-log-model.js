const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class ClaimLog {
    constructor ({claim_id=null, timestamp=null, status=null, uuid=null, service_center_id=null, branch_id=null} ={}) {
        // class attribute
        this._claimId = claim_id;
        this._status = status;
        this._timestamp = timestamp;
        this._uuid = uuid;
        this._serviceCenterId = service_center_id;
        this._branchId = branch_id;
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
            'SELECT * FROM claim_log c INNER JOIN purchased_product p ON c.uuid = p.uuid WHERE p.customer_id = ?',
            [customerId]
        );
    };

    static _readByPurchasedProduct(uuid, customerId) {
        return db.execute(
            'SELECT claim_id, status, timestamp, c.uuid, service_center_id, branch_id, serial_no, product_no, customer_id, product_nickname, price, invoice_id, create_timestamp, branch_id, retailer_id, receipt_photo, is_validate, product_photo, claim_qty, warranty_photo FROM claim_log c INNER JOIN purchased_product p ON c.uuid = p.uuid WHERE c.uuid = ? AND c.customer_id = ?;',
            [uuid, customerId]
        );
    }

    _update() {
        return db.execute(
            'UPDATE claim_log SET status = ? timestamp = ?, uuid = ?, service_center_id = ?, branch_id = ? WHERE claim_id = ?',
            [this._status, this._timestamp, this._uuid, this._serviceCenterBranch.getProperty.serviceCenterId, this._serviceCenterBranch.getProperty.branchId, this._claimId]
        );
    };

    static _update(claimId) {
        return db.execute(
            'UPDATE claim_log SET status = ? timestamp = ?, uuid = ?, service_center_id = ?, branch_id = ? WHERE claim_id = ?',
            [this._status, this._timestamp, this._uuid, this._serviceCenterBranch.getProperty.serviceCenterId, this._serviceCenterBranch.getProperty.branchId, claimId, customerId]
        );
    }

    static _delete(claimId) {
        return db.execute(
            'DELETE FROM claim_log WHERE claim_id = ? ',
            [claimId]
        );
    }


    // PROBLEM DOMAIN
    get getProperty() {
        return {
            claimId: this._claimId,
            timestamp: this._timestamp,
            status: this._status,
            uuid: this._uuid,
            serviceCenterId: this._serviceCenterId,
            branchId: this._branchId
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

};