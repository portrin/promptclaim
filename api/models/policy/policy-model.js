const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class Policy {
    constructor({ policyId = null, policyPeriod = null, policyDescription = null, dateCreated = null, ownerType = null } = {}) {
        // their own class atrribute ref. from class diagram
        this._policyId = policyId;
        this._policyPeriod = policyPeriod;
        this._policyDescription = policyDescription;
        this._dateCreated = dateCreated;
        this._ownerType = ownerType;
        // their relationships to its neighbor ref. from class diagram
        this._policyOwner = null;       // relationship to PolicyOwner
        this._serviceCenterBranch = []; // relationship to ServiceCenterBranch
        this._purchasedProduct = [];    // relationship to PurchasedProduct
    }

    // DM layer CRUD
    _create() {
        //get policyOwnerId
        return db.execute(
            'INSERT INTO policy(policy_id, policy_period, policy_description, ownerType, policy_owner_id) VALUES (?, ?, ?, ?, ?)',
            [this._policyId, this._policyPeriod, this._policyDescription, this._ownerType, this._policyOwner.getProperty.policyOwnerId]
        );
    }

    static _read() {
        return db.execute('SELECT * FROM policy');
    }

    static _readByPolicyId(policyId) {
        return db.execute('SELECT * FROM policy WHERE policy_id = ?', [policyId]);
    }

    _update() {
        return db.execute('UPDATE policy SET policy_period = ?, policy_description = ?, ownerType = ?, policy_owner_id = ? WHERE policy_id = ?',
            [this._policyPeriod, this._policyDescription, this._ownerType, this._policyOwner.getProperty.policyOwnerId, this._policyId]);
    }

    _delete() {
        return db.execute('DELETE FROM policy WHERE policy_id = ?', [this._policyId]);
    }

    // getter and setter
    get getProperty() {
        return {
            policyId = this._policyId,
            policyPeriod = this._policyPeriod,
            policyDescription = this._policyDescription,
            dateCreated = this._dateCreated,
            ownerType = this._ownerType,
            policyOwner = this._policyOwner,
            serviceCenterBranch = this._serviceCenterBranch,
            purchasedProduct = this._purchasedProduct,
        };
    }

    set setProperty({ // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        policyId = this._policyId,
        policyPeriod = this._policyPeriod,
        policyDescription = this._policyDescription,
        dateCreated = this._dateCreated,
        ownerType = this._ownerType
    }) {
        // check datatype
        checkType(policyId, 'String');
        checkType(policyPeriod, 'String');
        checkType(policyDescription, 'String');
        checkType(dateCreated, 'String');
        checkType(ownerType, 'String');
        // assign to private variables
        this._policyId = policyId;
        this._policyPeriod = policyPeriod;
        this._policyDescription = policyDescription;
        this._dateCreated = dateCreated;
        this._ownerType = ownerType;
    }

    addPolicyOwner(policyOwner) {
        checkType(policyOwner, 'PolicyOwner');
        this._policyOwner = policyOwner;
        return;
    }

    addServiceCenterBranch(serviceCenterBranch) {
        checkType(serviceCenterBranch, 'ServiceCenterBranch');
        this._serviceCenterBranch.push(serviceCenterBranch);
        return;
    }

    addPurchasedProduct(purchasedProduct) {
        checkType(purchasedProduct, 'PurchasedProduct');
        this._purchasedProduct.push(purchasedProduct);
        return;
    }
}
