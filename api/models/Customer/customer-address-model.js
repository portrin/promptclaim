const db = require('../../config/db');
const Customer = require('./customer-model');

module.exports = class CustomerAddress {
    constructor(addressId,houseNo,street,subDistrict,district,province,zipcode){
        this._addressId = addressId;
        this._houseNo = houseNo;
        this._street = street; 
        this._subDistrict = subDistrict; 
        this._district = district;
        this._province = province; 
        this._zipcode = zipcode;
        this._customer;
    }

    //create address
    _create = () => {
        const customerId = Customer.getCustomerId()
        return db.execute(
            'INSERT INTO customer_address(customer_id, address_id,house_no,street,sub_district,district,province,zipcode) VALUES(address_id=?,house_no = ?, street = ?, sub_district = ? , district = ?, province = ?, zipcode =?)',
            [customerId,
            this.addressId,
            this._houseNo,
            this._street,
            this._subDistrict,
            this._district,
            this._province,
            this._zipcode
            ]
        )
    }

    static _read =() =>{
        const customerId = Customer.getCustomerId()
        return db.execute(
            'SELECT * FROM customer_address WHERE customer_id =? AND address_id =?',
            [customerId, this._addressId]
        )
    }

    //edit customer address
    _update = () => {
        const customerId = Customer.getCustomerId()
        return db.execute(
            'UPDATE `customer_address` SET house_no = ?, street = ?, sub_district = ? , district = ?, province = ?, zipcode = ? WHERE customer_id =?, address_id=?', 
            [this._houseNo, 
            this._street, 
            this._subDistrict, 
            this._district, 
            this._province, 
            this._zipcode, 
            customerId,
            this._addressId]
        )}

    //delete address
    _deleteAddress = (addressId) => {
        const customerId = Customer.getCustomerId()
        return db.execute('DELETE FROM customer_address WHERE custumer_address = ? AND customer_id = ?', [this._addressId, customerId])
    }
} 