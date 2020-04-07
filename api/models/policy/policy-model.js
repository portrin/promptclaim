const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class Policy {
    constructor(policyId, policyPeriod, policyDescription, dateCreated) {
        // their own class atrribute ref. from class diagram
        this._policyId = policyId;
        this._policyPeriod = policyPeriod;
        this._policyDescription = policyDescription;
        this._dateCreated = dateCreated;
        // their relationships to its neighbor ref. from class diagram
        this._policyOwner;
        this._serviceCenterBranch = [];
        this._purchasedProduct = [];
    }

    // DM layer CRUD
    _create() {
        //get policyOwnerId
        return db.execute(
            'INSERT INTO policy(policy_id, policy_period, policy_description, policy_owner_id) VALUES (?, ?, ?, ?)',
            [this._policyId, this._policyPeriod, this._policyDescription, /*policyowner_id*/]
        );
    }

    static _read() {
        return db.execute('SELECT * FROM policy');
    }

    _update() {
        return db.execute('UPDATE policy SET policy_period = ?, policy_description = ?, policy_owner_id = ? WHERE policy_id = ?', 
        [this._policyPeriod, this._policyDescription, /*policyOwnerId*/, this._policyId]);
    }

    _delete() {
        return db.execute('DELETE FROM policy WHERE policy_id = ?', [this._policyId]);
    }
}
