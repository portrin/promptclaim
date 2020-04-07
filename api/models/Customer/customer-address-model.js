const db = require('../../config/db');
const Customer = require('./customer-model');

module.exports = class CustomerAddress {
    constructor(address_id,house_no,street,sub_district,district,province,zipcode){
        this._address_id = address_id;
        this._house_no = house_no;
        this._street = street; 
        this._sub_district = sub_district; 
        this._district = district;
        this._province = province; 
        this._zipcode = zipcode;
    }

    editAddress = (address_id) => {
        const customer_id = Customer.getCustomerId()
        return db.execute(
            'UPDATE `customer` INNER JOIN `customer_address` ON address_id = ? SET house_no = ?, street = ?, sub_district = ? , district = ?, province = ?, zipcode = ? WHERE customer_id =?', 
            [address_id, 
            this._house_no, 
            this._street, 
            this._sub_district, 
            this._district, 
            this._province, 
            this._zipcode, 
            customer_id]
        )}
} 
