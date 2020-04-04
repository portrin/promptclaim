const Customer = require('./customer-model.js');

module.exports = class CustomerAccount extends Customer {
<<<<<<< HEAD
    constructor(account_id,username,password,email){
        this._account_id = account_id
        this._username = username;
        this._password = password; 
        this._email = email;
    }

    editProfile(account_id, address_id, ) {
        return db.execute(
            'UPDATE `customer_account` INNER JOIN `customer` ON customer_id = ? SET username = ?, password = ?, email = ? WHERE account_id =?', 
            [customer_id,
            this.username, 
            this.password, 
            this.email, 
            account_id]
        );
=======
    constructor(account_id, username, password, email){
        this.account_id = account_id
        this.username = username;
        this.password = password; 
        this.email = email;
>>>>>>> a892342cb7f69b62e0706054be6a8608a6de8587
    }
}

