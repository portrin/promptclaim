const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class CustomerAccount{
    constructor({account_id = null, username = null, password = null, email = null} = {}){
        // their own class atrribute ref. from class diagram
        this._accountId = account_id
        this._username = username;
        this._password = password; 
        this._email = email;
        // relationship from customer class
        this._customer = null;
    }

    // DM Layer CRUD
    _create () {
        return db.execute('INSERT INTO customer_account(username, password, email) VALUES(?, ?, ?)',
        [this._username,
        this._password,
        this._email]);
    }

    static _readByCustomerId(customerId) {
        return db.execute(
            'SELECT account_id, username, password, email FROM customer_account NATURAL JOIN customer WHERE customer_id = ?',
            [customerId]
        )
    }

    _read () {
        return db.execute(
            'SELECT * FROM customer_account WHERE account_id = ?', 
            [this._accountId]
        )
    }

    _update () {
        return db.execute(
            'UPDATE customer_account SET username = ?, password = ?, email = ? WHERE account_id = ?', 
            [this._username, 
            this._password, 
            this._email, 
            this._accountId]
        );
    }

    static _delete (accountId) {
        return db.execute('DELETE FROM customer_account WHERE account_id = ?', [accountId])
    }

    // getter and setter
    get getProperty() {
        return {
            accountId: this._accountId,
            username: this._username,
            password: this._password, 
            email: this._email,
            customer: this._customer
        };
    }

    set setProperty({  // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        accountId = this._accountId,
        username = this._username,
        password = this._password,
        email = this._email
    }) {
        // check datatype
        checkType(accountId, 'Number');
        checkType(username, 'String');
        checkType(password, 'String');
        checkType(email, 'String');
        // assign to private variables
        this._accountId = accountId;
        this._username = username;
        this._password = password; 
        this._email = email;
    }
}