const checkType = require('../../utils').checkType;
const db = require('../../config/db');

module.exports = class PolicyOwner {
    constructor({ policyOwnerId=null, ownerType=null }) {
        // their own class atrribute ref. from class diagram
        this._policyOwnerId = policyOwnerId;
        this._ownerType = ownerType;
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
    // Problem Domain layer

    // Policy
    addPolicy(policy) {
        checkType(policy, 'Policy');
        this._policy.push(policy);
        return;
    }

    // Relation to Retailer, Supplier, or ThirdParty
    addIsa(obj) {
        if (obj.constructor.name === 'Retailer') {
            this._isa = obj;
            this._ownerType = 'R';
        } else if (obj.constructor.name === 'Supplier') {
            this.isa = obj;
            this._ownerType = 'S';
        } else if (obj.constructor.name === 'ThirdParty') {
            this.isa = obj;
            this._ownerType = 'T';
        } else {
            throw new TypeError('the input object is not Retailer, Supplier, or ThirdParty');
        }
    }
}




