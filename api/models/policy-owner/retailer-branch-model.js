const Retailer = require('./retailer-model');

module.exports = class RetailerBranch extends Retailer {
    constructor(branchId, branchName, contact, address) {
        this.branchId = branchId;
        this.branchName = branchName;
        this.contact = contact;
        this.address = address;
    }

    //method 
}