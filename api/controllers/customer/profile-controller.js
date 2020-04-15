const jwt = require('jsonwebtoken');
const Customer = require('../../models/customer/customer-model');

exports.getByCustomerId = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const customer = (await Customer._readByCustomerId(customerId))[0][0];
    if(customer) {
        res.send('no customer exists');
    } else {
        res.send(customer);
    }
}

exports.postEditByCustomerId = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    
}