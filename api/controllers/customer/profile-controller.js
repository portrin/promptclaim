const jwt = require('jsonwebtoken');
const Customer = require('../../models/customer/customer-model');

exports.getByCustomerId = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const customer = (await Customer._readByCustomerId(customerId))[0][0];
    console.log(customer);
    if(customer) {
        res.send(customer);
    } else {
        res.send('no customer exists');
    }
}

exports.postEditByCustomerId = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phoneNo = req.body.phoneNo;
    const birthDate = req.body.birthDate;
}