const db = require('../../config/db');
const checkType = require('../../utils').checkType;

const ServiceCenter = require('./service-center-model');

module.exports = class ServiceCenterBranch extends ServiceCenter {
    constructor(branchId, branchName, contact, address) {
        // their own class atrribute ref. from class diagram
        this._branchId = branchId;
        this._branchName = branchName;
        this._contact = contact;
        this._address = address;
        // their relationships to its neighbor ref. from class diagram
        this._serviceCenter;
        this._policy = [];
        this._claimLog = [];
    }
    
    // DM layer CRUD
    _create() {
        //get policyOwnerId
        return db.execute(
            'INSERT INTO service_center_branch(branch_id, service_center_id, branch_name, contact, address) VALUES (?, ?, ?, ?, ?)',
            [this._branchid, /*serviceCenterId*/, this._branchName, this._contact, this._address]
        );
    }

    static _read() {
        return db.execute('SELECT * FROM service_center_branch');
    }

    _update() {
        return db.execute('UPDATE service_center_branch SET branch_name = ?, contact = ?, address = ? WHERE branch_id = ? AND service_center_id = ?', 
        [this._branchName, this._contact, this._address, this._branchId, /*serviceCenterId*/]);
    }

    _delete() {
        return db.execute('DELETE FROM service_center_branch WHERE branch_id = ? AND service_center_id = ?', [this._branchId, /*serviceCenterId*/]);
    }
}

