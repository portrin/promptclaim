const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class ServiceCenter {
    constructor({ service_center_id = null, service_center_hq_address = null, service_center_name = null, service_center_description = null } = {}) {
        // their own class atrribute ref. from class diagram
        this._serviceCenterId = service_center_id;
        this._serviceCenterName = service_center_name;
        this._serviceCenterHqAddress = service_center_hq_address;
        this._serviceCenterDescription = service_center_description;
        // their relationships to its neighbor ref. from class diagram
        this._serviceCenterBranch = []; // relationship to ServiceCenterBranch
    }

    // DM layer CRUD
    _create() {
        //get policyOwnerId
        return db.execute(
            'INSERT INTO service_center(service_center_id, service_center_name, service_center_hq_address, service_center_description) VALUES (?, ?, ?, ?)',
            [this._serviceCenterId, this._serviceCenterName, this.serviceCenterHqAddress, this._serviceCenterDescription]
        );
    }

    _read() {
        return db.execute('SELECT * FROM service_center WHERE service_center_id = ?', [this._serviceCenterId]);
    }

    static _readByServiceCenterId(serviceCenterId) {
        return db.execute('SELECT * FROM service_center WHERE service_center_id = ?', [serviceCenterId]);
    }

    _update() {
        return db.execute('UPDATE service_center SET service_center_name = ?, service_center_hq_address = ?, service_center_description= ? WHERE service_center_id = ?',
            [this._serviceCenterName, this._serviceCenterHqAddress, this._serviceCenterDescription, this._serviceCenterId]);
    }

    _delete() {
        return db.execute('DELETE FROM service_center WHERE service_center_id = ?', [this._serviceCenterId]);
    }

    // getter and setter
    get getProperty() {
        return {
            serviceCenterId: this._serviceCenterId,
            serviceCenterName: this._serviceCenterName,
            serviceCenterHqAddress: this._serviceCenterHqAddress,
            serviceCenterDesciption: this._serviceCenterDescription,
            serviceCenterBranch: this._serviceCenterBranch
        };
    }

    set setProperty({ // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        serviceCenterId = this._serviceCenterId,
        serviceCenterName = this._serviceCenterName,
        serviceCenterDesciption = this._serviceCenterDescription,
        serviceCenterHqAddress = this._serviceCenterHqAddress
    }) {
        // check datatype
        checkType(serviceCenterId, 'String');
        checkType(serviceCenterName, 'String');
        checkType(serviceCenterDescription, 'String');
        checkType(serviceCenterHqAddress, 'String');
        // assign to private variables
        this._serviceCenterId = serviceCenterId;
        this._serviceCenterName = serviceCenterName;
        this._serviceCenterDescription = serviceCenterDesciption;
        this._serviceCenterHqAddress = serviceCenterHqAddress;
    }

}

