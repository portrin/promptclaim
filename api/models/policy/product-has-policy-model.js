const db = require('../../config/db');
const checktType = require('../../utils').checkType;

module.exports = class ProductHasPolicy {
    constructor({
        policy_id = null,
        uuid = null,
        policy_start_date = null,
        policy_end_date = null,
        timestamp = null
    } = {}) {
        // their own class atrribute ref. from class diagram
        this._policyId = policy_id;
        this._uuid = uuid;
        this._policyStartDate = policy_start_date;
        this._policyEndDate = policy_end_date;
        this._timestamp = timestamp;
    }

    //DM Layer CRUD
    _create() {
        return db.execute(
            'INSERT INTO product_has_policy (policy_id, uuid, policy_start_date, policy_end_date, timestamp) VALUES (?, ?, ?, ?, ?)',
            [this._policyId, this._uuid, this._policyStartDate, this._policyEndDate, this._timestamp]
        );
    }

    static _readByCustomerId(customerId) {
        return db.execute(
            'SELECT policy_id, uuid, policy_start_date, policy_end_date, timestamp FROM product_has_policy NATURAL JOIN purchased_product WHERE customer_id = ?',
            [customerId]
        );
    }

    static _readByPolicyId(customerId, policyId) {
        return db.execute(
            'SELECT policy_id, uuid, policy_start_date, policy_end_date, timestamp FROM product_has_policy NATURAL JOIN purchased_product WHERE customer_id = ? AND policy_id = ?',
            [customerId, policyId]
        );
    }

    static _readByUuid(customerId, uuid) {
        return db.execute(
            'SELECT policy_id, uuid, policy_start_date, policy_end_date, timestamp FROM product_has_policy NATURAL JOIN purchased_product WHERE customer_id = ? AND uuid = ?',
            [customerId, uuid]
        );
    }
    
    _update(policyId, uuid) {
        return db.execute(
            'UPDATE product_has_policy SET policy_start_date = ?, policy_end_date = ?, timestamp = ? WHERE policy_id = ? AND uuid = ?',
            [this._policyStartDate, this._policyEndDate, this._timestamp, policyId, uuid]
        );
    }

    static _deleteByPk(policyId, uuid) {
        return db.execute(
            'DELETE FROM product_has_policy WHERE policy_id = ? AND uuid = ?',
            [policyId, uuid]
        );
    }

    //getter and setter
    get getProperty() {
        return {
            policyId: this._policyId,
            uuid: this._uuid,
            policyStartDate: this._policyStartDate,
            policyEndDate: this._policyEndDate,
            timestamp: this._timestamp
        };
    }

    set setProperty({
        // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        policyId = this._policyId,
        uuid = this._uuid,
        policyStartDate = this._policyStartDate,
        policyEndDate = this._policyEndDate,
        timestamp = this._timestamp
    }) {
        // check datatype
        checktType(policyId, 'String');
        checktType(uuid, 'String');
        checktType(policyStartDate, 'Date');
        checktType(policyEndDate, 'Date');
        checktType(timestamp, 'Timestamp');
        // assign to private variables
        this._policyId = policyId;
        this._uuid = uuid;
        this._policyStartDate = policyStartDate;
        this._policyEndDate = policyEndDate;
        this._timestamp = timestamp;
    }
};