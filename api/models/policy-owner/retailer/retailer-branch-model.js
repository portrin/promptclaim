const Retailer = require('./retailer-model');

module.exports = class RetailerBranch {
    constructor(branchName, contact, address) {
        // their own class atrribute ref. from class diagram
        this._branchId = branchId;
        this._branchName = branchName;
        this._contact = contact;
        this._address = address;
        // their relationships to its neighbor ref. from class diagram
        this._retailer;
        this._purchasedProduct = [];
    }

    // DM layer CRUD
    _create () {
        return db.execute('INSERT INTO retailer_branch(retailer_id, branch_id, branch_name, contact, address) VALUES (?,?,?,?,?)',
            [/*retailerId*/, this._branchId, this._branchName, this._contact, this._address]
        );
    }

    static _read () {
        return db.execute('SELECT * FROM retailer_branch');
    }

    _update () {
        return db.execute('UPDATE retailer_branch SET branch_name = ?, contact = ?, address = ? WHERE retailer_id = ? AND branch_id = ?',
            [this._branchName, this._contact, this._address, /*retailerId*/, this._branchId]
        );
    }

    _delete () {
        return db.execute('DELETE FROM retailer_branch WHERE retailer_id = ? AND branch_id = ?', [/*retailerId*/, this._branchId]);
    }
}