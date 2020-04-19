const db = require('../../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class Supplier{
    constructor({ supplier_id = null, supplier_name = null, supplier_description = null, supplier_contact = null, supplier_address = null, root_id = null, policy_owner_id = null} = {}) {
        // their own class atrribute ref. from class diagram
        this._supplierId = supplier_id;
        this._supplierName = supplier_name;
        this._supplierDescription = supplier_description;
        this._supplierContact = supplierContact;
        this._supplierAddress = supplierAddress;
        this._rootId = root_id;
        this._policyOwnerId = policy_owner_id;
        // their relationships to its neighbor ref. from class diagram
        this._rootAccount = null;   // relationship to RootAccount 
        this._product = [];         // relationship to Product class
        this._policyOwner = null;   // relationship to PolicyOwner class
    }

    // DM layer CRUD
    _create() {
        return db.execute('INSERT INTO supplier(supplier_id, supplier_description, supplier_name, supplier_contact, supplier_address, root_id, policy_owner_id) VALUES (?,?,?,?,?,?,?)',
            [this._supplierId, this._supplierDescription, this._supplierName, this._supplierContact, this._supplierAddress, this._rootId, this._policyOwnerId]
        );
    }

    _read() {
        return db.execute('SELECT * FROM supplier WHERE supplier_id = ?', [this._supplierId]);
    }

    static _readBySupplierId(supplierId) {
        return db.execute('SELECT * FROM supplier WHERE supplier_id = ?', [supplierId]);
    }

    _update() {
        return db.execute('UPDATE supplier SET supplier_description = ?, supplier_name = ?, supplier_contact = ?, supplier_address = ?, root_id = ?, policy_owner_id = ? WHERE supplier_id = ?',
            [this._supplierDescription, this._supplierName, this._supplierContact, this._supplierAddress, this._rootId, this._policyOwnerId, this._supplierId]
        );
    }

    _delete() {
        return db.execute('DELETE FROM supplier WHERE supplier_id = ?', [this._supplierId]);
    }

    // getter and setter
    getProperty() {
        return {
            supplierId: this._supplierId,
            supplierName: this._supplierName,
            supplierDescription: this._supplierDescription,
            supplierContact: this._supplierContact,
            supplierAddress: this._supplierAddress,
            rootId : this._rootId,
            policyOwnerId : this._policyOwnerId,
            rootAccount: this._rootAccount,
            product: this._product,
            policyOwner: this._policyOwner
        }
    }

    setProperty({ // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        supplierId = this._supplierId,
        supplierName = this._supplierName,
        supplierDescription = this._supplierDescription,
        supplierContact = this._supplierContact,
        supplierAddress = this._supplierAddress,
        rootId = this._rootId,
        policyOwnerId = this._policyOwnerId,
    }) {
        // check datatype
        checkType(supplierId, 'String');
        checkType(supplierName, 'String');
        checkType(supplierDescription, 'String');
        checkType(supplierContact, 'String');
        checkType(supplierAddress, 'String');
        checkType(rootId, 'String');
        checkType(policyOwnerId, 'String');
        // assign to private variables
        this._supplierId = supplierId;
        this._supplierName = supplierName;
        this._supplierDescription = supplierDescription;
        this._supplierContact = supplierContact;
        this._supplierAddress = supplierAddress;
        this._rootId = rootId;
        this._policyOwnerId = policyOwnerId;
    }
}