const db = require('../../../config/db');
const checkType = require('../../../utils').checkType;

module.exports = class Retailer {
    constructor({retailer_id = null, retailer_name = null, retailer_contact = null, retailer_hq_address = null, retailer_description = null, root_id = null, policy_owner_id = null} = {}) {
        // their own class atrribute ref. from class diagram
        this._retailerId = retailer_id;
        this._retailerName = retailer_name;
        this._retailerDescription = retailer_description;
        this._retailerContact = retailer_contact;
        this._retailerHqAddress = retailer_hq_address;
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
            'INSERT INTO retailer (retailer_id, retailer_name, retailer_description, retailer_contact, retailer_hq_address, policy_owner_id, root_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this._retailerId, this._retailerName, this._retailerDescription, this._retailerContact, this._retailerHqAddress, this._policyOwnerId, this._rootId]
        )
    }
    static _read() {
        return db.execute('SELECT retailer_name, retailer_id FROM retailer');
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
        return db.execute('UPDATE retailer SET retailer_contact = ?, retailer_name = ?, retailer_hq_address = ?, retailer_description = ?, root_id = ?, policy_owner_id = ? WHERE retailer_id = ?',
            [this._retailerContact, this._retailerName, this._retailerHqAddress, this._retailerDescription, this._rootId, this._policyOwnerId, this._retailerId]
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
            retailerName: this._retailerName,
            retailerDescription: this._retailerDescription,
            retailerContact: this._retailerContact,
            retailerHqAddress: this._retailerHqAddress,
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
        retailerName = this._retailerName,
        retailerDescription = this._retailerDescription,
        retailerContact = this._retailerContact,
        retailerHqAddress = this._retailerHqAddress
    }) {
        // check datatype
        checkType(retailerId, 'String');
        checkType(rootId, 'String');
        checkType(policyOwnerId, 'String');
        checkType(retailerName, 'String');
        checkType(retailerDescription, 'String');
        checkType(retailerContact, 'String');
        checkType(retailerHqAddress, 'String');
        // assign to private variables
        this._retailerId = retailerId;
        this._rootId = rootId;
        this.policyOwnerId = policyOwnerId;
        this._retailerName = retailerName;
        this._retailerDescription = retailerDescription;
        this._retailerContact = retailerContact;
        this._retailerHqAddress = retailerHqAddress;
    }
}