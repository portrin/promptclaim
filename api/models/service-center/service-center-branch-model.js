const ServiceCenter = require('./service-center-model');

module.exports = class ServiceCenterBranch extends ServiceCenter {
    constructor(branchId, branchName, contact, address) {
        this._branchid = branchId;
        this._brnachName = branchName;
        this._contact = contact;
        this._address = address;
    }

    //method

}
