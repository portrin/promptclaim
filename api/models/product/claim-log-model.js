const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class ClaimLog {
    constructor ({claim_id=null, claim_log_timestamp=null, status=null, uuid=null, service_center_id=null, service_center_branch_id=null} ={}) {
        // class attribute
        this._claimId = claim_id;
        this._status = status;
        this._claimLogTimestamp = claim_log_timestamp;
        this._uuid = uuid;
        this._serviceCenterId = service_center_id;
        this._serviceCenterBranchId = service_center_branch_id;
    };
    // CRUD METHOD
    _create() {
        return db.execute(
            'INSERT INTO claim_log(status, claim_log_timestamp, uuid, service_center_id, service_center_branch_id) VALUES(?, ?, ?, ?, ?)',
            [this._status, 
            this._claimLogTimestamp,
            this._uuid, 
            this._serviceCenterId,
            this._serviceCenterBranchId
            ]
        );
    };


    _read() {
        return db.execute(
            'SELECT * FROM claim_log WHERE claim_id = ?',
            [this._claimId]
        )
    }

    static _readByClaimId(claimId, customerId) {
        return db.execute(
            'SELECT * FROM claim_log c INNER JOIN purchased_product p ON c.uuid = p.uuid WHERE c.claim_id = ? AND p.customer_id = ?',
            [claimId, customerId]
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
            'SELECT * FROM claim_log c INNER JOIN purchased_product p ON c.uuid = p.uuid WHERE c.uuid = ? AND p.customer_id = ?',
            [uuid, customerId]
        );
    }

    _update() {
        return db.execute(
            'UPDATE claim_log SET status = ? claim_log_timestamp = ?, uuid = ?, service_center_id = ?, service_center_branch_id = ? WHERE claim_id = ?',
            [this._status, this._claimLogTimestamp, this._uuid, this._serviceCenterId, this._branchId, this._claimId]
        );
    };

    _update(claimId) {
        return db.execute(
            'UPDATE claim_log SET status = ?, claim_log_timestamp = ?, uuid = ?, service_center_id = ?, service_center_branch_id = ? WHERE claim_id = ?',
            [this._status, this._claimLogTimestamp, this._uuid, this._serviceCenterId, this._serviceCenterBranchId, claimId]
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
            claimLogTimestamp: this._claimLogTimestamp,
            status: this._status,
            uuid: this._uuid,
            serviceCenterId: this._serviceCenterId,
            serviceCenterBranchId: this._serviceCenterBranchId
        };
    };

    set setProperty({
        claimId = this._claimId,
        claimLogTimestamp = this._claimLogTimestamp,
        status = this._status,
        uuid = this._uuid,
        serviceCenterId = this._serviceCenterId,
        serviceCenterBranchId = this._serviceCenterBranchId
    }) {
        checkType(claimId, 'String');
        checkType(claimLogTimestamp, 'Date');
        checkType(status, 'String');
        checkType(uuid, 'Number');
        checkType(serviceCenterId, 'String');
        checkType(serviceCenterBranchId, 'String');
        this._claimId = claimId;
        this._claimLogTimestamp = claimLogTimestamp;
        this._status = status;
        this._uuid = uuid;
        this._serviceCenterId = serviceCenterId;
        this._serviceCenterBranchId = serviceCenterBranchId;
    };

};