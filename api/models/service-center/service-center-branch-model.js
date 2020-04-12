const db = require('../../config/db');
const checkType = require('../../utils').checkType;

const ServiceCenter = require('./service-center-model');

module.exports = class ServiceCenterBranch {
    constructor({ branchId = null, branchName = null, contact = null, address = null } = {}) {
        // their own class atrribute ref. from class diagram
        this._branchId = branchId;
        this._branchName = branchName;
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
            [this._branchid, this._serviceCenter.getProperty.serviceCenterId, this._branchName, this._contact, this._address]
        );
    }

    static _read() {
        return db.execute('SELECT * FROM service_center_branch');
    }

    static _readByPk(serviceCenterId, branchId) {
        return db.execute('SELECT * FROM service_center_branch WHERE service_center_id = ? AND branch_id = ?', [serviceCenterId, branchId]);
    }

    _update() {
        return db.execute('UPDATE service_center_branch SET branch_name = ?, contact = ?, address = ? WHERE branch_id = ? AND service_center_id = ?',
            [this._branchName, this._contact, this._address, this._branchId, this._serviceCenter.getProperty.serviceCenterId]);
    }

    _delete() {
        return db.execute('DELETE FROM service_center_branch WHERE branch_id = ? AND service_center_id = ?', [this._branchId, this._serviceCenter.getProperty.serviceCenterId]);
    }

    // getter and setter
    getProperty() {
        return {
            branchId = this._branchId,
            branchName = this._branchName,
            contact = this._contact,
            address = this._address,
            serviceCenter = this._serviceCenter,
            policy = this._policy,         
            claimLog = this._claimLog        
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

    // Service Center
    addServiceCenter(serviceCenter) {
        checkType(serviceCenter, 'ServiceCenter');
        this._serviceCenter = serviceCenter;
        return;
    }

    // Policy
    addPolicy(policy) {
        checkType(policy, 'Policy');
        this._policy.push(policy);
        return;
    }
    
    // Claim Log
    addClaimLog(claimLog) {
        checkType(claimLog, 'ClaimLog');
        this._claimLog.push(claimLog);
        return;
    }
}






