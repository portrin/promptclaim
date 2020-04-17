const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class ServiceCenterBranch {
    constructor({ branch_id = null, service_center_id = null, branch_name = null, contact = null, address = null } = {}) {
        // their own class atrribute ref. from class diagram
        this._branchId = branch_id;
        this._serviceCenterId = service_center_id;
        this._branchName = branch_name;
        this._contact = contact;
        this._address = address;
        // their relationships to its neighbor ref. from class diagram
        this._serviceCenter = null; // relationship to ServiceCenter
        this._policy = [];          // relationship to Policy 
        this._claimLog = [];        // relationship to ClaimLog
    }

    // DM layer CRUD
    _create() {
        //get policyOwnerId
        return db.execute(
            'INSERT INTO service_center_branch(branch_id, service_center_id, branch_name, contact, address) VALUES (?, ?, ?, ?, ?)',
            [this._branchid, this._serviceCenterId, this._branchName, this._contact, this._address]
        );
    }

    _read() {
        return db.execute('SELECT * FROM service_center_branch WHERE WHERE service_center_id = ? AND branch_id = ?', [this._serviceCenterId, this._branchId]);
    }

    static _readByUuid(uuid) {
        return db.execute('SELECT service_center_id, branch_id, name, branch_name, hq_address, address, contact, service_center_description FROM product_has_policy NATURAL JOIN policy_available_at NATURAL JOIN service_center NATURAL JOIN service_center_branch WHERE uuid = ?', [uuid]);
    }

    static _readByPolicyId(policyId) {
        return db.execute(
            'SELECT * FROM service_center NATURAL JOIN service_center_branch NATURAL JOIN policy_available_at WHERE policy_id = ?',
            [policyId]
        );
    }

    _update() {
        return db.execute('UPDATE service_center_branch SET branch_name = ?, contact = ?, address = ? WHERE branch_id = ? AND service_center_id = ?',
            [this._branchName, this._contact, this._address, this._branchId, this._serviceCenterId]);
    }

    _delete() {
        return db.execute('DELETE FROM service_center_branch WHERE branch_id = ? AND service_center_id = ?', [this._branchId, this._serviceCenterId]);
    }

    // getter and setter
    get getProperty() {
        return {
            branchId: this._branchId,
            serviceCenterId: this._serviceCenterId,
            branchName: this._branchName,
            contact: this._contact,
            address: this._address,
            serviceCenter: this._serviceCenter,
            policy: this._policy,         
            claimLog: this._claimLog        
        };
    }

    set setProperty({ // set only its own attributes
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






