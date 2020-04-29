const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class Customer {
    constructor({customer_id=null, firstname=null, lastname=null, phone_no=null, birth_date=null, gender=null, account_id=null} = {}) {
        // their own class atrribute ref. from class diagram
        this._customerId = customer_id
        this._firstname = firstname
        this._lastname = lastname
        this._phoneNo = phone_no
        this._birthDate = birth_date
        this._gender = gender
        this._accountId = account_id
        // their relationships to its neighbor ref. from class diagram
        this._customerAccount = null;   // relationship to CustomerAccount
        this._customerAddress = [];     // relationship to CustomerAddress
        this._purchasedProduct = [];    // relationship to PurchasedProduct
        this._notification = [];        // relationship to Notification
        // special attributes that will be used often.
        this._claimLog = [];           
    }
    // DM layer CRUD
    _create () {
        return db.execute(
            'INSERT INTO customer (customer_id, firstname, lastname, phone_no, birth_date, gender, account_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this._customerId, this._firstname, this._lastname, this._phoneNo, this._birthDate, this._gender, this._accountId]
        );
    }

    static _readByCustomerId (customerId) {
        return db.execute(
            'SELECT * FROM customer WHERE customer_id = ?', 
            [customerId]
        )
    }

    _read () {
        return db.execute(
            'SELECT * FROM customer WHERE customer_id = ?',
            [this._customerId]
        )
    }

    _update () {
        return db.execute(
            'UPDATE customer SET firstname = ?, lastname = ?, phone_no = ?, birth_date = ?, gender = ?, account_id = ? WHERE customer_id = ?',
            [this._firstname, this._lastname, this._phoneNo, this._birthDate, this._gender, this._accountId, this._customerId]
        )
    }

    _delete () {
        return db.execute('DELETE FROM customer WHERE custumer_id = ?', [this._customerId])
    }

    // getter and setter
    get getProperty() {
        return {
            customerId: this._customerId,
            firstname: this._firstname,
            lastname: this._lastname,
            phoneNo: this._phoneNo,
            birthDate: this._birthDate,
            gender: this._gender,
            accountId: this._accountId,
            customerAddress: this._customerAddress,
            customerAccount: this._customerAccount,
            purchasedProduct: this._purchasedProduct,
            claimLog: this._claimLog,
            notification: this._notification
        };
    }

    set setProperty({  // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        customerId = this._customerId,
        firstname = this._firstname,
        lastname = this._lastname,
        phoneNo = this._phoneNo,
        birthDate = this._birthDate,
        gender = this._gender,
    }) {
        // check datatype
        checkType(customerId, 'Number');
        checkType(firstname, 'String');
        checkType(lastname, 'String');
        checkType(phoneNo, 'String');
        checkType(birthDate, 'Date');
        checkType(gender, 'String');
        // assign to private variables
        this._customerId = customerId;
        this._firstname = firstname;
        this._lastname = lastname;
        this._phoneNo = phoneNo;
        this._birthDate = birthDate;
        this._gender = gender;
    }

}

