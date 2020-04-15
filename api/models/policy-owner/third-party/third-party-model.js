const db = require('../../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class ThirdParty {
    constructor({third_party_id = null, root_id = null, policy_owner_id = null, name = null, third_party_description = null, contact = null, address = null } = {}) {
        // their own class atrribute ref. from class diagram
        this._thirdPartyId = third_party_id;
        this._rootId = root_id;
        this._policyOwnerId = policy_owner_id;
        this._name = name;
        this._contact = contact;
        this._address = address;
        this._thirdPartyDescription = third_party_description;
        // their relationships to its neighbor ref. from class diagram
        this._rootAccount = null;   // relationship to RootAccount 
        this._policyOwner = null;   // relationship to PolicyOwner
    }

    //DM Layer CRUD
    _create() {
        return db.execute('INSERT INTO third_party(third_party_id, address, name, contact, third_party_description, root_id, policy_owner_id) VALUES (?,?,?,?,?,?,?)',
            [this._thirdPartyId, this._address, this._name, this._contact, this._thirdPartyDescription, this._rootId, this._policyOwnerId]
        );
    }

    _read() {
        return db.execute('SELECT * FROM third_party WHERE third_party_id = ?', [this._thirdPartyId]);
    }

    static _readByThirdPartyId(thirdPartyId) {
        return db.execute('SELECT * FROM third_party WHERE third_party_id = ?', [thirdPartyId]);
    }

    _update() {
        return db.execute('UPDATE third_party SET address = ?, name = ?, contact = ?, third_party_description = ?, root_id = ?, policy_owner_id = ? WHERE third_party_id = ?',
            [this._address, this._name, this._contact, this._thirdPartyDescription, this._rootId, this._policyOwnerId, this._thirdPartyId]
        );
    }

    _delete() {
        return db.execute('DELETE FROM third_party WHERE third_party_id = ?', [this._thirdPartyId]);
    }

    // getter and setter
    getProperty() {
        return {
            thirdPartyId: this._thirdPartyId,
            rootId : this._rootId,
            policyOwnerId : this._policyOwnerId,
            name: this._name,
            contact: this._contact,
            address: this._address,
            thirdPartyDescription: this._thirdPartyDescription,
            rootAccount: this._rootAccount,
            policyOwner: this._policyOwner
        };
    }

    setProperty({ // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        thirdPartyId = this._thirdPartyId,
        rootId = this._rootId,
        policyOwnerId = this._policyOwnerId,
        name = this._name,
        contact = this._contact,
        address = this._address,
        thirdPartyDescription = this._thirdPartyDescription
    }) {
        // check datatype
        checkType(thirdPartyId, 'String');
        checkType(rootId, 'String');
        checkType(policyOwnerId, 'String');
        checkType(name, 'String');
        checkType(contact, 'String');
        checkType(address, 'String');
        checkType(thirdPartyDescription, 'String');
        // assign to private variables
        this._thirdPartyId = thirdPartyId;
        this._rootId = rootId;
        this._policyOwnerId = policyOwnerId;
        this._name = name;
        this._contact = contact;
        this._address = address;
        this._thirdPartyDescription = thirdPartyDescription;
    }
}


