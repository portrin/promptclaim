const PolicyOwner = require('./policy-owner-model');

module.exports = class Retailer extends PolicyOwner {
    constructor(retailerId, name, retailerDescription, contact, hqAddress) {
        this.retailerId = retailerId;
        this.name = name;
        this.retailerDescription = retailerDescription;
        this.contact = contact;
        this.hqAddress = hqAddress;
    }

    //method
}