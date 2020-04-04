const Customer = require('../models/Customer/user-model');

exports.userDefault = (req,res,next) => {
    res.send("Log in")
    console.log(connection)
}

exports.getUserInfoId = (req,res,next) => {
    const id = req.params.id
    if(!id){
        res.send("No user existed")
    }else{
        Customer.findById(id)
    }
}
exports.editAccountById = (req,res,next) => {
    const account_id = req.params.acctId
    if(!account_id){
        res.send("No user existed")
    }else{
        const update_username = req.body.username;
        const update_password = req.body.password; 
        const update_email = req.body.email ;
        const user = new Customer({
            update_username, 
            update_password,
            update_email,
        })
}

exports.editAddressById = (req,res,next) => {
    const customer_id = req.params.custId
    const address_id = req.params.addrId
    if(!id){
        res.send("No user existed")
    }else{
        const update_house_no = req.body.house_no;
        const update_street = req.body.street; 
        const update_sub_district = req.body.sub_district; 
        const update_district = req.body.district;
        const update_province = req.body.province; 
        const update_zipcode = req.body.update_zipcode;
        const user = new Customer({
            customer_id,
            address_id,
            update_house_no,
            update_street,
            update_sub_district,
            update_district,
            update_province,
            update_zipcode
        })
        res.send({
            customer: result
        })
    }
}