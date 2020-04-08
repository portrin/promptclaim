const PolicyOwner = require('../policy-owner-model');
const checkType = require('../../utils').checkType;

module.exports = class ThirdParty extends PolicyOwner {
    constructor(policyOwnerId, ownerType, thirdPartyId, name, thirdPartyDescription, contact, address) {
        // their own class atrribute ref. from class diagram
        super(policyOwnerId, ownerType);
        this._thirdPartyId = thirdPartyId;
        this._name = name;
        this._contact = contact;
        this._address = address;
        this._thirdPartyDescription = thirdPartyDescription;
        // their relationships to its neighbor ref. from class diagram
        this._rootAccount; // RootAccount class
    }

    //DM Layer CRUD
    _create () {
        return db.execute('INSERT INTO third_party(third_party_id, address, name, contact, third_party_description, root_id, policy_owner_id) VALUES (?,?,?,?,?,?,?)',
            [this._thirdPartyId, this._address, this._name, this._contact, this._thirdPartyDescription, /*rootAccountId*/, this.policyOwnerId]
        );
    }

    static _read () {
        return db.execute('SELECT * FROM third_party');
    }

    _update () {
        return db.execute('UPDATE third_party SET address = ?, name = ?, contact = ?, third_party_description = ?, root_id = ?, policy_owner_id = ? WHERE third_party_id = ?',
            [this._address, this._name, this._contact, this._thirdPartyDescription, /*rootAccountId*/, this.policyOwnerId, this._thirdPartyId]
        );
    }

    _delete () {
        return db.execute('DELETE FROM third_party WHERE third_party_id = ?', [this._thirdPartyId]);
    }

}
