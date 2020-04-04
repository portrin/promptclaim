const PolicyOwner = require('../policy-owner-model');

module.exports = class ThirdParty extends PolicyOwner {
    constructor(policyOwnerId, ownerType, thirdPartyId, name, thirdPartyDescription, contact, address) {
        super(policyOwnerId, ownerType);
        this._thirdPartyId = thirdPartyId;
        this._name = name;
        this._thirdPartyDescription = thirdPartyDescription;
        this._contact = contact;
        this._address = address;
        this._rootAccount; // RootAccount class
    }

    // method
}