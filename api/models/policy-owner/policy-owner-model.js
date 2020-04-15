const checkType = require('../../utils').checkType;
const db = require('../../config/db');

module.exports = class PolicyOwner {
    constructor({ policy_owner_id=null, owner_type=null }) {
        // their own class atrribute ref. from class diagram
        this._policyOwnerId = policy_owner_id;
        this._ownerType = owner_type;
        // their relationships to its neighbor ref. from class diagram
        this._isa = null;
        this._policy = [];
    }
    // DM layer
    _create() {
        return db.execute(
            'INSERT INTO policy_owner (policy_owner_id, owner_type) VALUES (?, ?)',
            [this._policyOwnerId, this._ownerType]
        )
    }

    static _read() {
        return db.execute(
            'SELECT * FROM policy_owner'
        )
    }

    static _readByPolicyOwnerId(policyOwnerId) {
        return db.execute(
            'SELECT * FROM policy_owner WHERE policy_owner_id = ?',
            [policyOwnerId]
        )
    }

    static _readByRetailerId(retailerId) {
        return db.execute(
            'SELECT * FROM policy_owner p NATURAL JOIN retailer r WHERE r.retailer_id = ?',
            [retailerId]
        )
    }

    static _readBySupplierId(supplierId) {
        return db.execute(
            'SELECT * FROM policy_owner p NATURAL JOIN supplier s WHERE s.supplier_id = ?',
            [supplierId]
        )
    }

    static _readByThirdPartyId(thirdPartyId) {
        return db.execute(
            'SELECT * FROM policy_owner p NATURAL JOIN third_party t WHERE t.third_party_id = ?',
            [thirdPartyId]
        )
    }

    _read() {
        return db.execute(
            'SELECT * FROM policy_owner WHERE policy_owner_id = ?',
            [this._policyOwnerId]
        );
    }

    _update() {
        return db.execute(
            'UPDATE policy_owner SET ownerType = ? WHERE policy_owner_id = ?',
            [this._ownerType, this._policyOwnerId]
        )
    }

    _delete() {
        return db.execute(
            'DELETE FROM policy_owner WHERE policy_owner_id = ?',
            [this._policyOwnerId]
        )
    }
    // getter and setter
    get getProperty() {
        return {
            policyOwnerId: this._policyOwnerId,
            ownerType: this._ownerType,
            isa: this._isa,
            policy: this._policy
        };
    }

    set setProperty({
        policyOwnerId = this._policyOwnerId,
        ownerType = this._ownerType,
    }) {
        checkType(policyOwnerId, 'String');
        checkType(ownerType, 'String');
        this._policyOwnerId = policyOwnerId;
        this._ownerType = ownerType;
    }
}




