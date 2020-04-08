const PolicyOwner = require('../policy-owner-model');

module.exports = class Retailer extends PolicyOwner {
    constructor(policyOwnerId, ownerType, retailerId, name, contact, hqAddress, retailerDescription) {
        // their own class atrribute ref. from class diagram
        super(policyOwnerId, ownerType);
        this._retailerId = retailerId;
        this._name = name;
        this._retailerDescription = retailerDescription;
        this._contact = contact;
        this._hqAddress = hqAddress;
        // their relationships to its neighbor ref. from class diagram
        this._retailerBranch = [];
        this._rootAccount; // RootAccount class
    }

    // DM layer CRUD
    _create () {
        return db.execute('INSERT INTO retailer(retailer_id, contact, name, hq_address, retailer_description, root_id, policy_owner_id) VALUES (?,?,?,?,?,?,?)',
            [this._retailerId, this._name, this._contact, this._hqAddress, this._retailerDescription, this._rootAccount, this.policyOwnerId]
        );
    }

    static _read () {
        return db.execute('SELECT * FROM retailer');
    }

    _update () {
        return db.execute('UPDATE retailer SET contact = ?, name = ?, hq_address = ?, retailer_description = ?, root_id = ?, policy_owner_id = ? WHERE retailer_id = ?',
            [this._contact, this._name, this._hqAddress, this._retailerDescription, this._rootAccount, this.PolicyOwner, this._retailerId]
        );
    }

    _delete () {
        return db.execute('DELETE FROM retailer WHERE retailer_id = ?', [this._retailerId]);
    }
}