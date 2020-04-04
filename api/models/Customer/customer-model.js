const db = require('../../config/db');
const Address = require('./customer-address-model')

module.exports = class Customer {
    constructor(customer_id,firstname,lastname,phone_no,birth_no,gender,address = new Address) {
        this._customer_id = customer_id;
        this._firstname = firstname;
        this._lastname = lastname;
        this._phone_no = phone_no;
        this._birth_no = birth_no;
        this._gender = gender;
        this._address = address;
    }

    //editUserAddress = () => {
    //    this.address.editAddress(customer_id,addrId)
    //}
    editAddress(address_id){
        this._address.editAddress(address_id);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM customer');
    }

    static findById(account_id) {
        return db.execute(
            "SELECT * FROM customer WHERE customer_id LIKE '%"+id +"%'",
            [account_id]
        );
    }
}