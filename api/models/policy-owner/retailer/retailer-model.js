const db = require('../../../config/db');
const checkType = require('../../../utils').checkType;

module.exports = class Retailer {
    constructor({ retailer_id = null, name = null, contact = null, hq_address = null, retailer_description = null } = {}) {
        // their own class atrribute ref. from class diagram
        this._retailerId = retailer_id;
        this._name = name;
        this._retailerDescription = retailer_description;
        this._contact = contact;
        this._hqAddress = hq_address;
        // their relationships to its neighbor ref. from class diagram
        this._retailerBranch = [];  // relationship to RetailerBranch
        this._rootAccount = null;   // relationship to RootAccount
        this._policyOwner = null;   // relationship to PolicyOwner
    }

    // DM layer CRUD
    _create() {
        return db.execute(
            'INSERT INTO retailer (retailer_id, name, retailer_description, contact, hq_address, policy_owner_id, root_id) VALUES (?, ?, ?, ?, ?, ?, ?)'
            [this._retailerId, this._name, this._retailerDescription, this._contact, this._hqAddress, this._policyOwner.getProperty.policyOwnerId, this._rootAccount.getProperty.rootId]
        )
    }
    _read() {
        return db.execute('SELECT * FROM retailer WHERE = ?',
        [this._retailerId]
        );
    }

    static _readByPolicyOwnerId(policyOwnerId) {
        return db.execute('SELECT * FROM retailer WHERE policy_owner_id = ?', [policyOwnerId]);
    }

    static _readByRetailerId(retailerId) {
        return db.execute('SELECT * FROM retailer WHERE retailer_id = ?', [retailerId]);
    }

    _update() {
        return db.execute('UPDATE retailer SET contact = ?, name = ?, hq_address = ?, retailer_description = ?, root_id = ?, policy_owner_id = ? WHERE retailer_id = ?',
            [this._contact, this._name, this._hqAddress, this._retailerDescription, this._rootAccount.getProperty.rootId, this._policyOwner.getProperty.policyOwnerId, this._retailerId]
        );
    }

    _delete() {
        return db.execute('DELETE FROM retailer WHERE retailer_id = ?', [this._retailerId]);
    }

    // getter and setter
    getProperty() {
        return {
            retailerId: this._retailerId,
            name: this._name,
            retailerDescription: this._retailerDescription,
            contact: this._contact,
            hqAddress: this._hqAddress,
            retailerBranch: this._retailerBranch,
            rootAccount: this._rootAccount,
            policyOwner: this._policyOwner
        };
    }

    setProperty({ // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        retailerId = this._retailerId,
        name = this._name,
        retailerDescription = this._retailerDescription,
        contact = this._contact,
        hqAddress = this._hqAddress
    }) {
        // check datatype
        checkType(retailerId, 'String');
        checkType(name, 'String');
        checkType(retailerDescription, 'String');
        checkType(contact, 'String');
        checkType(hqAddress, 'String');
        // assign to private variables
        this.policyOwnerId = policyOwnerId;
        this._retailerId = retailerId;
        this._name = name;
        this._retailerDescription = retailerDescription;
        this._contact = contact;
        this._hqAddress = hqAddress;
    }
}



