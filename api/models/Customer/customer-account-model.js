const Customer = require('./customer-model.js');

module.exports = class CustomerAccount extends Customer {
    constructor(account_id, username, password, email){
        this.account_id = account_id
        this.username = username;
        this.password = password; 
        this.email = email;
    }
}

