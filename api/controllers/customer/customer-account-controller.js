//Class customer account
const CustomerAccount = require('../../models/customer/customer-account-model');
const jwt = require('jsonwebtoken');

exports.getAccount = async (req,res,next) => {
    const customer_id = jwt.decode(req.headers.authorization).sub
    const customerAccount = (await CustomerAccount._readByCustomerId(customer_id))[0]
    res.send({
        getAccount : customerAccount
    })
}

exports.postEditAccount = async (req,res,next) => {
    const customerId = jwt.decode(req.headers.authorization).sub
    const accountId = customerId;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const customerAccount = new CustomerAccount((await CustomerAccount._readByCustomerId(customerId))[0][0]);
    customerAccount.setProperty = {
        accountId,
        username,
        password,
        email
    }
    const result = (await customerAccount._update())[0]
    res.send({
        result: result})
}

/*exports.deleteAccount = async (req,res,next) => {
    const customer_id = jwt.decode(req.headers.authorization).sub
    const account_id = customer_id;
    const result = (await CustomerAccount._delete(account_id))[0]
    res.send({
        deletedAccount : result
    })
}*/

