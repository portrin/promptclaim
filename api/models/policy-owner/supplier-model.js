const PolicyOwner = require('./policy-owner-model');

module.exports = class Supplier extends PolicyOwner {
    constructor(supplierId, name, supplierDescription, contact, address) {
        this.supplierId = supplierId;
        this.name = name;
        this.supplierDescription = supplierDescription;
        this.contact = contact;
        this.address = address;
    }

    // method
}