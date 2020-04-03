const PolicyOwner = require('./policy-owner-model');

module.exports = class ThirdParty extends PolicyOwner {
    constructor(thirdPartyId, name, thirdPartyDescription, contact, address) {
        this.thirdPartyId = thirdPartyId;
        this.name = name;
        this.thirdPartyDescription = thirdPartyDescription;
        this.contact = contact;
        this.address = address;
    }

    // method
}