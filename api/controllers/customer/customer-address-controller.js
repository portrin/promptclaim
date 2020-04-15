//Customer address model
const CustomerAddress = require('../../models/customer/customer-address-model');
const jwt = require('jsonwebtoken');

exports.postAddAddressById = async (req,res,next) => {
    const customerId = jwt.decode(req.headers.authorization).sub
    const address_id = req.params.addrId
    const update_house_no = req.body.house_no;
    const update_street = req.body.street;
    const update_sub_district = req.body.sub_district;
    const update_district = req.body.district;
    const update_province = req.body.province;
    const update_zipcode = req.body.update_zipcode;
    const customerAddress = new CustomerAddress({
        customerId,
        address_id,
        update_house_no,
        update_street,
        update_sub_district,
        update_district,
        update_province,
        update_zipcode
    })
    const result = await customerAddress._create()
    res.send({
        addedAddress : result
    })
}

exports.getAddressByCustId= async (req,res,next) => {
    const customerId = jwt.decode(req.headers.authorization).sub
    const customerAddress = await CustomerAddress._readByCustomerId(customerId)
    res.send({
        getAddress : customerAddress
    })
}

exports.getAddressByPK = async (req,res,next) => {
    const customerId = jwt.decode(req.headers.authorization).sub
    const address_id = req.params.addrId
    const customerAddress = await CustomerAddress._readByPK(customerId, address_id)
    res.send({
        getAddress : customerAddress
    })
}

exports.postEditAddressById = async (req,res,next) => {
    const customerId = jwt.decode(req.headers.authorization).sub
    const address_id = req.params.addrId
    const update_house_no = req.body.house_no;
    const update_street = req.body.street;
    const update_sub_district = req.body.sub_district;
    const update_district = req.body.district;
    const update_province = req.body.province;
    const update_zipcode = req.body.update_zipcode;
    const customerAddress = new CustomerAddress({
        customerId,
        address_id,
        update_house_no,
        update_street,
        update_sub_district,
        update_district,
        update_province,
        update_zipcode
    })
    const result = await customerAddress._update()
    res.send({
        editededAddress : result
    })
}

exports.deleteAddressByPK = async (req,res,next) => {
    const customerId = jwt.decode(req.headers.authorization).sub
    const address_id = req.params.addrId
    const result = await CustomerAddress._delete(customerId, address_id)
    res.send({
        deletedAddress : result
    })
}

