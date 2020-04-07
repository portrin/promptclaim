const Customer = require('./customer-model.js');

module.exports = class CustomerAccount{
    constructor(account_id,username,password,email,){
        this._account_id = account_id
        this._username = username;
        this._password = password; 
        this._email = email;
    }
    //static depends on class or not
    //static = method kong class not object : customer.play()
    //Mai static : praew.play()

    //in class diagram --> mai static
    editProfile(account_id) {
        return db.execute(
            'UPDATE `customer_account` INNER JOIN `customer` ON customer_id = ? SET username = ?, password = ?, email = ? WHERE account_id =?', 
            [customer_id,
            this._username, 
            this._password, 
            this._email, 
            this._account_id]
        );
    }
}

