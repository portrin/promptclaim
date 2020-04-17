const Customer = require('../../models/customer/customer-model');
const jwt = require('jsonwebtoken');

/*
exports.postAddProfile = async (req,res,next) => {
    const customer_id = jwt.decode(req.headers.authorization).sub
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phone_no = req.body.phoneNo;
    const birth_date = req.body.birthDate;
    const gender = req.body.gender;
    const account_id = customer_id;
    const customer = new Customer({
        customer_id,
        firstname,
        lastname,
        phone_no,
        birth_date,
        gender,
        account_id
    })
    const customerProfile = await customer._create()
    res.send({
        addedProfile: customerProfile
        })
}
*/

exports.getProfile = async (req, res, next) => {
    const customer_id = jwt.decode(req.headers.authorization).sub
    const customerProfile = (await Customer._readByCustomerId(customer_id))[0]
    res.send({
        getProfile : customerProfile
    })
}

exports.postEditProfile = async (req,res,next) => {
    const customer_id = jwt.decode(req.headers.authorization).sub
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phone_no = req.body.phoneNo;
    const birth_date = req.body.birthDate;
    const gender = req.body.gender;
    const account_id = customer_id;
    const customer = new Customer({
        customer_id,
        firstname,
        lastname,
        phone_no,
        birth_date,
        gender,
        account_id
    })
    const customerProfile = await customer._update()
    res.send({
        editProfile : customerProfile
    })
}

