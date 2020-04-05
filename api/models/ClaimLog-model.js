const db = require('../config/db');
const PurchasedProduct = require('./PurchasedProduct-model');

module.exports = class ClaimLog {
    constructor () {
        this._claimId = claimId;
        this._timestamp = timsestamp;
        this._status = status;
        this._purchasedProduct = new PurchasedProduct();
        this._serviceCenterId; // from serviceCenter
        this._brnachId; // from ServiceCenter 

    };
};