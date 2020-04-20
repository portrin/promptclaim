const db = require('../../../config/db');
const checkType = require('../../../utils').checkType;

module.exports = class RetailerBranch {
    constructor({retailer_id = null, retailer_branch_id = null, retailer_branch_name = null, retailer_branch_contact = null, retailer_branch_address = null } = {}) {
        // their own class atrribute ref. from class diagram
        this._retailerId = retailer_id;
        this._retailerBranchId = retailer_branch_id;
        this._retailerBranchName = retailer_branch_name;
        this._retailerBranchContact = retailer_branch_contact;
        this._retailerBranchAddress = retailer_branch_address;
        // their relationships to its neighbor ref. from class diagram
        this._retailer = null;        // relationship to Retailer
        this._purchasedProduct = [];  // relationship to PurchasedProduct
    }

    // DM layer CRUD
    _create() {
        return db.execute('INSERT INTO retailer_branch(retailer_id, retailer_branch_id, retailer_branch_name, retailer_branch_contact, retailer_branch_address) VALUES (?,?,?,?,?)',
            [this._retailerId, this._retailerBranchId, this._retailerBranchName, this._retailerBranchContact, this._retailerBranchAddress]
        );
    }

    _read() {
        return db.execute('SELECT * FROM retailer_branch WHERE retailer_id = ? AND retailer_branch_id = ?', [this._retailerId, this._retailerBranchId]);
    }

    static _readByRetailerId(retailerId) {
        return db.execute(
            'SELECT * FROM retailer_branch WHERE retailer_id = ?',
            [retailerId]
        )
    }

    static _readByPk(retailerId, retailerBranchId) {
        return db.execute('SELECT * FROM retailer_branch WHERE retailer_id = ? AND retailer_branch_id = ?', [retailerId, retailerBranchId]);
    }

    static _readRetailerBranch(){
        return db.execute('SELECT retailer_branch_id, retailer_branch_name FROM retailer_branch')
    }

    _update() {
        return db.execute('UPDATE retailer_branch SET retailer_branch_name = ?, retailer_branch_contact = ?, retailer_branch_address = ? WHERE retailer_id = ? AND retailer_branch_id = ?',
            [this._retailerBranchName, this._retailerBranchContact, this._retailerBranchAddress, this._retailerId, this._retailerBranchId]
        );
    }

    _delete() {
        return db.execute('DELETE FROM retailer_branch WHERE retailer_id = ? AND retailer_branch_id = ?', [this._retailerId, this._retailerBranchId]);
    }

    // getter and setter
    getProperty() {
        return {
            retailerId: this._retailerId,
            retailerBranchId: this._retailerBranchId,
            retailerBranchName: this._retailerBranchName,
            retailerBranchContact: this._retailerBranchContact,
            retailerBranchAddress: this._retailerBranchAddress,
            retailer: this._retailer,
            purchasedProduct: this._purchasedProduct
        };
    }

    setProperty({ // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        retailerId = this._retailerId,
        retailerBranchId = this._retailerBranchId,
        retailerBranchName = this._retailerBranchName,
        retailerBranchContact = this._retailerBranchContact,
        retailerBranchAddress = this._retailerBranchAddress
    }) {
        // check datatype
        checkType(retailerId, 'String');
        checkType(retailerBranchId, 'String');
        checkType(retailerBranchName, 'String');
        checkType(retailerBranchContact, 'String');
        checkType(retailerBranchAddress, 'String');
        // assign to private variables
        this._retailerId = retailerId;
        this._retailerBranchId = retailerBranchId;
        this._retailerBranchName = retailerBranchName;
        this._retailerBranchContact = retailerBranchContact;
        this._retailerBranchAddress = retailerBtanchAddress;
    }
}

