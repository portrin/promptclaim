const db = require('../../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class Supplier{
    constructor({ supplier_id = null, name = null, supplier_description = null, contact = null, address = null } = {}) {
        // their own class atrribute ref. from class diagram
        this._supplierId = supplier_id;
        this._name = name;
        this._supplierDescription = supplier_description;
        this._contact = contact;
        this._address = address;
        // their relationships to its neighbor ref. from class diagram
        this._rootAccount = null;   // relationship to RootAccount 
        this._product = [];         // relationship to Product class
        this._policyOwner = null;   // relationship to PolicyOwner class
    }

    // DM layer CRUD
    _create() {
        return db.execute('INSERT INTO supplier(supplier_id, supplier_description, name, contact, address, root_id, policy_owner_id) VALUES (?,?,?,?,?,?,?)',
            [this._supplierId, this._supplierDescription, this._name, this._contact, this._address, this._rootAccount.getProperty.rootId, this._policyOwner.getProperty.policyOwnerId]
        );
    }

    _read() {
        return db.execute('SELECT * FROM supplier WHERE supplier_id = ?', [this._supplierId]);
    }

    static _readBySupplierId(supplierId) {
        return db.execute('SELECT * FROM supplier WHERE supplier_id = ?', [supplierId]);
    }

    _update() {
        return db.execute('UPDATE supplier SET supplier_description = ?, name = ?, contact = ?, address = ?, root_id = ?, policy_owner_id = ? WHERE supplier_id = ?',
            [this._supplierDescription, this._name, this._contact, this._address, this._rootAccount.getProperty.rootId, this._policyOwner.getProperty.policyOwnerId, this._supplierId]
        );
    }

    _delete() {
        return db.execute('DELETE FROM supplier WHERE supplier_id = ?', [this._supplierId]);
    }

    // getter and setter
    getProperty() {
        return {
            supplierId: this._supplierId,
            name: this._name,
            supplierDescription: this._supplierDescription,
            contact: this._contact,
            address: this._address,
            rootAccount: this._rootAccount,
            product: this._product,
            policyOwner: this._policyOwner
        }
    }

    setProperty({ // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        supplierId = this._supplierId,
        name = this._name,
        supplierDescription = this._supplierDescription,
        contact = this._contact,
        address = this._address,
    }) {
        // check datatype
        checkType(supplierId, 'String');
        checkType(name, 'String');
        checkType(supplierDescription, 'String');
        checkType(contact, 'String');
        checkType(address, 'String');
        // assign to private variables
        this._supplierId = supplierId;
        this._name = name;
        this._supplierDescription = supplierDescription;
        this._contact = contact;
        this._address = address;
    }
}