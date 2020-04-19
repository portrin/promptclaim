const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class ServiceCenterBranch {
    constructor({ service_center_branch_id = null, service_center_id = null, service_center_branch_name = null, service_center_branch_contact = null, service_center_branch_address = null } = {}) {
        // their own class atrribute ref. from class diagram
        this._serviceCenterBranchId = service_center_branch_id;
        this._serviceCenterId = service_center_id;
        this._serviceCenterBranchName = service_center_branch_name;
        this._serviceCenterBranchContact = service_center_branch_contact;
        this._serviceCenterBranchAddress = service_center_branch_address;
        // their relationships to its neighbor ref. from class diagram
        this._serviceCenter = null; // relationship to ServiceCenter
        this._policy = [];          // relationship to Policy 
        this._claimLog = [];        // relationship to ClaimLog
    }

    // DM layer CRUD
    _create() {
        //get policyOwnerId
        return db.execute(
            'INSERT INTO service_center_branch(service_center_branch_id, service_center_id, service_center_branch_name, service_center_branch_contact, service_center_branch_address) VALUES (?, ?, ?, ?, ?)',
            [this._serviceCenterBranchId, this._serviceCenterId, this._serviceCenterBranchName, this._serviceCenterBranchContact, this._serviceCenterBranchAddress]
        );
    }

    _read() {
        return db.execute('SELECT * FROM service_center_branch WHERE WHERE service_center_id = ? AND service_center_branch_id = ?', [this._serviceCenterId, this._serviceCenterBranchId]);
    }

    static _readByUuid(uuid, customerId) {
        return db.execute('SELECT service_center_id, service_center_branch_id, service_center_name, service_center_branch_name, service_center_branch_contact, service_center_branch_address, service_center_description FROM policy_available_at NATURAL JOIN service_center NATURAL JOIN service_center_branch WHERE policy_id IN (SELECT policy_id FROM product_has_policy WHERE uuid = ? AND uuid IN (SELECT uuid FROM purchased_product WHERE customer_id = ?))', 
            [uuid, customerId]
        );
    }

    static _readByPolicyId(policyId, customerId) {
        return db.execute(
            'SELECT service_center_id, service_center_branch_id, service_center_name, service_center_branch_name, service_center_branch_contact, service_center_branch_address, service_center_description FROM policy_available_at NATURAL JOIN service_center NATURAL JOIN service_center_branch WHERE policy_id IN (SELECT policy_id FROM product_has_policy WHERE policy_id = ? AND uuid IN (SELECT uuid FROM purchased_product WHERE customer_id = ?))',
            [policyId, customerId]
        );
    }

    _update() {
        return db.execute('UPDATE service_center_branch SET service_center_branch_name = ?, service_center_branch_contact = ?, service_center_branch_address = ? WHERE service_center_branch_id = ? AND service_center_id = ?',
            [this._serviceCenterBranchName, this._serviceCenterBranchContact, this._serviceCenterBranchAddress, this._serviceCenterBranchId, this._serviceCenterId]);
    }

    _delete() {
        return db.execute('DELETE FROM service_center_branch WHERE service_center_branch_id = ? AND service_center_id = ?', [this._serviceCenterBranchId, this._serviceCenterId]);
    }

    // getter and setter
    get getProperty() {
        return {
            serviceCenterBranchId: this._serviceCenterBranchId,
            serviceCenterId: this._serviceCenterId,
            serviceCenterBranchName: this._serviceCenterBranchName,
            serviceCenterBranchContact: this._serviceCenterBranchContact,
            serviceCenterBranchAddress: this._serviceCenterBranchAddress,
            serviceCenter: this._serviceCenter,
            policy: this._policy,         
            claimLog: this._claimLog        
        };
    }

    set setProperty({ // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        serviceCenterBranchId = this._serviceCenterBranchId,
        serviceCenterBranchName = this._serviceCenterBranchName,
        serviceCenterBranchContact = this._serviceCenterBranchContact,
        serviceCenterBranchAddress = this._serviceCenterBranchAddress
    }) {
        // check datatype
        checkType(serviceCenterBranchId, 'String');
        checkType(serviceCenterBranchName, 'String');
        checkType(serviceCenterBranchContact, 'String');
        checkType(serviceCenterBranchAddress, 'String');
        // assign to private variables
        this._serviceCenterBranchId = serviceCenterBranchId;
        this._serviceCenterBranchName = serviceCenterBranchName;
        this._serviceCenterBranchContact = serviceCenterBranchContact;
        this._serviceCenterBranchAddress = serviceCenterBranchAddress;
    }
}






