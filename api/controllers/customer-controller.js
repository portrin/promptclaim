const Customer = require('../models/customer/customer-model');
const CustomerAccount = require('../models/customer/customer-account-model');
const jwt = require('jsonwebtoken');


exports.userDefault = (req, res, next) => {
    //console.log(req.headers.authorization)
    res.send("Log in")
}

exports.getUserInfoId = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub
    const customer = new Customer((await Customer._readByCustomerId(customerId))[0][0]);
    customer.addCustomerAccount(new CustomerAccount( (await CustomerAccount._readByCustomerId(customerId))[0][0] ) );



    console.log(customer) 
    if (customer) {
        res.send(customer.getProperty);
    }else{
        res.send('No user exist!');
    }
}

exports.editProfile = (req,res,next) => {
    const account_id = req.params.acctId
    if (!account_id) {
        res.send("No user existed")
    } else {
        const update_username = req.body.username;
        const update_password = req.body.password; 
        const update_email = req.body.email ;
        //const result = new CustomerAccount({
        //    account_id,
        //    update_username, 
        //    update_password,
        //    update_email,
        //})
        res.send({
            editedAccount: result
        })
    }
}
