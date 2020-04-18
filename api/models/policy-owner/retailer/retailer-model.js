const db = require('../../../config/db');
const checkType = require('../../../utils').checkType;

module.exports = class Retailer {
    constructor({retailer_id = null, name = null, contact = null, hq_address = null, retailer_description = null, root_id = null, policy_owner_id = null} = {}) {
        // their own class atrribute ref. from class diagram
        this._retailerId = retailer_id;
        this._name = name;
        this._retailerDescription = retailer_description;
        this._contact = contact;
        this._hqAddress = hq_address;
        this._rootId = root_id;
        this._policyOwnerId = policy_owner_id;
        // their relationships to its neighbor ref. from class diagram
        this._retailerBranch = [];  // relationship to RetailerBranch
        this._rootAccount = null;   // relationship to RootAccount
        this._policyOwner = null;   // relationship to PolicyOwner
    }

    // DM layer CRUD
    _create() {
        return db.execute(
            'INSERT INTO retailer (retailer_id, name, retailer_description, contact, hq_address, policy_owner_id, root_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this._retailerId, this._name, this._retailerDescription, this._contact, this._hqAddress, this._policyOwnerId, this._rootId]
        )
    }
    _read() {
        return db.execute('SELECT * FROM retailer WHERE = ?',
        [this._retailerId]
        );
    }
    static async _getPolicyOwnerIdByRetailerId(retailerId){
        return (await db.execute('SELECT policy_owner_id FROM retailer WHERE retailer_id = ?', [retailerId]))[0][0].policy_owner_id;
    }

    static _readByPolicyOwnerId(policyOwnerId) {
        return db.execute('SELECT * FROM retailer WHERE policy_owner_id = ?', [policyOwnerId]);
    }

    static _readByRetailerId(retailerId) {
        return db.execute('SELECT * FROM retailer WHERE retailer_id = ?', [retailerId]);
    }

    _update() {
        return db.execute('UPDATE retailer SET contact = ?, name = ?, hq_address = ?, retailer_description = ?, root_id = ?, policy_owner_id = ? WHERE retailer_id = ?',
            [this._contact, this._name, this._hqAddress, this._retailerDescription, this._rootId, this._policyOwnerId, this._retailerId]
        );
    }

    static _delete(retailerId) {
        return db.execute('DELETE FROM retailer WHERE retailer_id = ?', [retailerId]);
    }

    // getter and setter
    get getProperty() {
        return {
            retailerId: this._retailerId,
            rootId: this._rootId,
            policyOwnerId: policyOwnerId,
            name: this._name,
            retailerDescription: this._retailerDescription,
            contact: this._contact,
            hqAddress: this._hqAddress,
            retailerBranch: this._retailerBranch,
            rootAccount: this._rootAccount,
            policyOwner: this._policyOwner
        };
    }

    set setProperty({ // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        retailerId = this._retailerId,
        rootId = this._rootId,
        policyOwnerId = this._policyOwnerId,
        name = this._name,
        retailerDescription = this._retailerDescription,
        contact = this._contact,
        hqAddress = this._hqAddress
    }) {
        // check datatype
        checkType(retailerId, 'String');
        checkType(rootId, 'String');
        checkType(policyOwnerId, 'String');
        checkType(name, 'String');
        checkType(retailerDescription, 'String');
        checkType(contact, 'String');
        checkType(hqAddress, 'String');
        // assign to private variables
        this._retailerId = retailerId;
        this._rootId = rootId;
        this.policyOwnerId = policyOwnerId;
        this._name = name;
        this._retailerDescription = retailerDescription;
        this._contact = contact;
        this._hqAddress = hqAddress;
    }
}



