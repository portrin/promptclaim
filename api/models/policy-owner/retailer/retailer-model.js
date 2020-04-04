const PolicyOwner = require('../policy-owner-model');

module.exports = class Retailer extends PolicyOwner {
    constructor(policyOwnerId, ownerType, retailerId, name, retailerDescription, contact, hqAddress) {
        super(policyOwnerId, ownerType);
        this._retailerId = retailerId;
        this._name = name;
        this._retailerDescription = retailerDescription;
        this._contact = contact;
        this._hqAddress = hqAddress;
        this._rootAccount; // RootAccount class
    }

    //method
}