const Retailer = require('./retailer-model');
const checkType = require('../../utils').checkType;

module.exports = class RetailerBranch {
    constructor({ branchName = null, contact = null, address = null } = {}) {
        // their own class atrribute ref. from class diagram
        this._branchId = branchId;
        this._branchName = branchName;
        this._contact = contact;
        this._address = address;
        // their relationships to its neighbor ref. from class diagram
        this._retailer = null;        // relationship to Retailer
        this._purchasedProduct = [];  // relationship to PurchasedProduct
    }

    // DM layer CRUD
    _create() {
        return db.execute('INSERT INTO retailer_branch(retailer_id, branch_id, branch_name, contact, address) VALUES (?,?,?,?,?)',
            [this._retailer.getProperty.retailerId, this._branchId, this._branchName, this._contact, this._address]
        );
    }

    static _read() {
        return db.execute('SELECT * FROM retailer_branch');
    }

    static _readByPk(retailerId, branchId) {
        return db.execute('SELECT * FROM retailer_branch WHERE retailer_id = ? AND branch_id = ?', [retailerId, branchId]);
    }

    _update() {
        return db.execute('UPDATE retailer_branch SET branch_name = ?, contact = ?, address = ? WHERE retailer_id = ? AND branch_id = ?',
            [this._branchName, this._contact, this._address, this._retailer.getProperty.retailerId, this._branchId]
        );
    }

    _delete() {
        return db.execute('DELETE FROM retailer_branch WHERE retailer_id = ? AND branch_id = ?', [this._retailer.getProperty.retailerId, this._branchId]);
    }

    // getter and setter
    getProperty() {
        return {
            branchId = this._branchId,
            branchName = this._branchName,
            contact = this._contact,
            address = this._address,
            retailer = this._retailer,
            purchasedProduct = this._purchasedProduct
        };
    }

    setProperty({ // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        branchId = this._branchId,
        branchName = this._branchName,
        contact = this._contact,
        address = this._address
    }) {
        // check datatype
        checkType(branchId, 'String');
        checkType(branchName, 'String');
        checkType(contact, 'String');
        checkType(address, 'String');
        // assign to private variables
        this._branchId = branchId;
        this._branchName = branchName;
        this._contact = contact;
        this._address = address;
    }

}