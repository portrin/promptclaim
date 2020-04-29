const CustomerAccount = require('../../models/customer/customer-account-model');

exports.postAddAccount = async (req,res,next) => {
    const account_id = req.body.accountId;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const customerAccount = new CustomerAccount({
        account_id,
        username,
        password,
        email
    })
    const result = (await customerAccount._create())[0]
    res.send({
        result: result
        })
}
