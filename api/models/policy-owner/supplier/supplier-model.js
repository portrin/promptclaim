const PolicyOwner = require('../policy-owner-model');


module.exports = class Supplier extends PolicyOwner {
    constructor(policyOwnerId, ownerType, supplierId, name, supplierDescription, contact, address) {
        super(policyOwnerId, ownerType);
        this._supplierId = supplierId;
        this._name = name;
        this._supplierDescription = supplierDescription;
        this._contact = contact;
        this._address = address;
        this._rootAccount; // RootAccount class
    }

    // method
}