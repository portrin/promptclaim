const db = require('../../config/db');
const checkType = require('../../utils').checkType;


module.exports = class CustomerAddress {
    constructor({customer_id = null, address_id = null, house_no = null, street = null, sub_district = null, district = null, province = null, zipcode = null} = {}){
        // their own class atrribute ref. from class diagram
        this._customerId = customer_id
        this._addressId = address_id;
        this._houseNo = house_no;
        this._street = street; 
        this._subDistrict = sub_district; 
        this._district = district;
        this._province = province; 
        this._zipcode = zipcode;
        // from relationship 
        this._customer = customer;
    }
//setter and gett perm and no more getProperty
    //DM Layer CRUD
    _create = () => {
        return db.execute(
            'INSERT INTO Customer_address(customer_id, address_id, house_no, street, sub_district, district, province, zipcode) VALUES(?,?,?,?,?,?,?)',
            [this._customerId,
            this._addressId,
            this._houseNo,
            this._street,
            this._subDistrict,
            this._district,
            this._province,
            this._zipcode 
            ]
        )
    }

    _read() {
        return db.execute(
            'SELECT * FROM Customer_address WHERE customer_id = ? AND account_id = ?',
            [this._customerId, this._addressId]
        )
    }

    static _readByCustomerId(customerId){
        return db.execute(
            'SELECT * FROM Customer_address WHERE customer_id = ?',
            [customerId]
        )
    }

    static _readByPK(customerId, addressId){
        return db.execute(
            'SELECT * FROM Customer_address WHERE customer_id = ? AND address_id = ?',
            [customerId, addressId]
        )
    }

    //edit customer address
    _update (){
        return db.execute(
            'UPDATE `Customer_address` SET house_no = ?, street = ?, sub_district = ? , district = ?, province = ?, zipcode = ? WHERE customer_id = ?, address_id= ?', 
            [this._houseNo, 
            this._street, 
            this._subDistrict, 
            this._district, 
            this._province, 
            this._zipcode, 
            this._customerId,
            this._addressId]
        )}

    //delete address
    static _delete(customerId, addressId) {
        return db.execute(
            'DELETE FROM Customer_address WHERE address_id = ? AND customer_id = ?',
            [addressId, customerId]
        )
    }

    //getter and setter
    get getProperty() {
        return {
        addressId: this._addressId,
        houseNo: this._houseNo,
        street: this._street,
        subDistrict: this._subDistrict, 
        district: this._district,
        province: this._province, 
        zipcode: this._zipcode,
        customerId: this._customerId,
        customer: this._customer
        };
    }
    
    set setProperty({  // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        addressId = this._addressId,
        houseNo = this._houseNo,
        street = this._street,
        subDistrict = this._subDistrict, 
        district = this._district,
        province = this._province, 
        zipcode = this._zipcode,
    }) {
        // check datatype
        checkType(addressId, 'String');
        checkType(houseNo, 'String');
        checkType(street, 'String');
        checkType(subDistrict, 'String');
        checkType(district, 'String');
        checkType(province, 'String');
        checkType(zipcode, 'String');
        // assign to private variables
        this._addressId = addressId;
        this._houseNo = houseNo;
        this._street = street; 
        this._subDistrict = subDistrict; 
        this._district = district;
        this._province = province; 
        this._zipcode = zipcode;
    }

} 