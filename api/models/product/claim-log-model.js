const db = require('../../config/db');
const PurchasedProduct = require('./purchased-product-model');

module.exports = class ClaimLog {
    constructor (claimId, timsestamp, status) {
        this._claimId = claimId;
        this._timestamp = timsestamp;
        this._status = status;
        this._purchasedProduct = [];
        this._serviceCenterId; // from serviceCenter
        this._brnachId; // from ServiceCenter 

    };
    _create() {
        return db.execute(
            'INSERT INTO claim_log(claim_id, timestamp, status) VALUES(?, ?, ?)',
            [this._claimId, this._timestamp, this._status]
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

};