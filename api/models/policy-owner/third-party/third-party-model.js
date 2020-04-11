const PolicyOwner = require('../policy-owner-model');
const checkType = require('../../utils').checkType;

module.exports = class ThirdParty extends PolicyOwner {
    constructor({ policyOwnerId = null, ownerType = null, thirdPartyId = null, name = null, thirdPartyDescription = null, contact = null, address = null } = {}) {
        // their own class atrribute ref. from class diagram
        super(policyOwnerId, ownerType);
        this._thirdPartyId = thirdPartyId;
        this._name = name;
        this._contact = contact;
        this._address = address;
        this._thirdPartyDescription = thirdPartyDescription;
        // their relationships to its neighbor ref. from class diagram
        this._rootAccount = null;  // relationship to RootAccount 
    }

    //DM Layer CRUD
    _create() {
        return db.execute('INSERT INTO third_party(third_party_id, address, name, contact, third_party_description, root_id, policy_owner_id) VALUES (?,?,?,?,?,?,?)',
            [this._thirdPartyId, this._address, this._name, this._contact, this._thirdPartyDescription, this._rootAccount.getProperty.rootId, this.policyOwnerId]
        );
    }

    static _read() {
        return db.execute('SELECT * FROM third_party');
    }

    static _readByThirdPartyId(thirdPartyId) {
        return db.execute('SELECT * FROM third_party WHERE third_party_id = ?', [thirdPartyId]);
    }

    _update() {
        return db.execute('UPDATE third_party SET address = ?, name = ?, contact = ?, third_party_description = ?, root_id = ?, policy_owner_id = ? WHERE third_party_id = ?',
            [this._address, this._name, this._contact, this._thirdPartyDescription, this._rootAccount.getProperty.rootId, this.policyOwnerId, this._thirdPartyId]
        );
    }

    _delete() {
        return db.execute('DELETE FROM third_party WHERE third_party_id = ?', [this._thirdPartyId]);
    }

    // getter and setter
    getProperty() {
        return {
            policyOwnerId = this.policyOwnerId,
            ownerType = this.ownerType,
            thirdPartyId = this._thirdPartyId,
            name = this._name,
            contact = this._contact,
            address = this._address,
            thirdPartyDescription = this._thirdPartyDescription,
            rootAccount = this._rootAccount
        };
    }

    setProperty({ // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        policyOwnerId = this.policyOwnerId,
        ownerType = this.ownerType,
        thirdPartyId = this._thirdPartyId,
        name = this._name,
        contact = this._contact,
        address = this._address,
        thirdPartyDescription = this._thirdPartyDescription  
    }) {
        // check datatype
        checkType(policyOwnerId, 'String');
        checkType(ownerType, 'String');
        checkType(thirdPartyId, 'String');
        checkType(name, 'String');
        checkType(contact, 'String');
        checkType(address, 'String');
        checkType(thirdPartyDescription, 'String');
        // assign to private variables
        this.policyOwnerId = policyOwnerId; 
        this.ownerType = ownerType;
        this._thirdPartyId = thirdPartyId;
        this._name = name;
        this._contact = contact;
        this._address = address;
        this._thirdPartyDescription = thirdPartyDescription;
    }
}
