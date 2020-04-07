const Customer = require('./customer-model.js');

module.exports = class CustomerAccount{
    constructor(accountId,username,password,email){
        this._accountId = accountId
        this._username = username;
        this._password = password; 
        this._email = email;
    }

    _create () {
        return db.execute('INSERT INTO Customer_account(account_id, username, password, email) VALUES(account_id =?, username = ?, password =?, email =?)',
        [this._accountId,
        this._username,
        this._password,
        this._email]);
    }

    static _read () {
        return db.execute('SELECT * FROM customer_account WHERE account_id =?',[this._accountId])
    }

    _update () {
        return db.execute(
            'UPDATE `customer_account` INNER JOIN `customer` ON customer_id = ? SET username = ?, password = ?, email = ? WHERE account_id =?', 
            [customer_id,
            this._username, 
            this._password, 
            this._email, 
            this._accountId]
        );
    }

    _delete () {
        return db.execute('DELETE FROM customer_account WHERE account_id = ?', [this._accountId])
    }

    verifyPassword(){

    }
    
    forgetPassword(){

    }
}

