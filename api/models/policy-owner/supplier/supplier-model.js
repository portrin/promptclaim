const PolicyOwner = require('../policy-owner-model');
const checkType = require('../../utils').checkType;

module.exports = class Supplier extends PolicyOwner {
    constructor(policyOwnerId, ownerType, supplierId, name, supplierDescription, contact, address) {
        // their own class atrribute ref. from class diagram
        super(policyOwnerId, ownerType);
        this._supplierId = supplierId;
        this._name = name;
        this._supplierDescription = supplierDescription;
        this._contact = contact;
        this._address = address;
        // their relationships to its neighbor ref. from class diagram
        this._rootAccount; // RootAccount class
    }

    // DM layer CRUD
    _create () {
        return db.execute('INSERT INTO supplier(supplier_id, supplier_description, name, contact, address, root_id, policy_owner_id) VALUES (?,?,?,?,?,?,?)',
            [this._supplierId, this._supplierDescription, this._name, this._contact, this._address, /*rootAccountId*/, this.policyOwnerId]
        );
    }

    static _read () {
        return db.execute('SELECT * FROM supplier');
    }

    _update () {
        return db.execute('UPDATE supplier SET supplier_description = ?, name = ?, contact = ?, address = ?, root_id = ?, policy_owner_id = ? WHERE supplier_id = ?',
            [this._supplierDescription, this._name, this._contact, this._address, /*rootAccountId*/, this.policyOwnerId]
        );
    }

    _delete () {
        return db.execute('DELETE FROM supplier WHERE supplier_id = ?', [this._supplierId]);
    }
}
