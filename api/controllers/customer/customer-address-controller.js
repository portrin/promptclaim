//Customer address model
const CustomerAddress = require('../../models/customer/customer-address-model');
const jwt = require('jsonwebtoken');

exports.postAddAddressByPK = async (req,res,next) => {
    const customer_id = jwt.decode(req.headers.authorization).sub
    const address_id = req.params.addressId;
    const house_no = req.body.houseNo;
    const street = req.body.street;
    const sub_district = req.body.subDistrict;
    const district = req.body.district;
    const province = req.body.province;
    const zipcode = req.body.zipcode;
    const customerAddress = new CustomerAddress({
        customer_id,
        address_id,
        house_no,
        street,
        sub_district,
        district,
        province,
        zipcode
    })
    const result = await customerAddress._create()
    res.send({
        result: customerAddress
        })
}

exports.getAddressByCustId= async (req,res,next) => {
    const customer_id = jwt.decode(req.headers.authorization).sub
    const customerAddress = (await CustomerAddress._readByCustomerId(customer_id))[0]
    res.send({
        getAddress : customerAddress
    })
}

exports.getAddressByPK = async (req,res,next) => {
    const customer_id = jwt.decode(req.headers.authorization).sub
    const address_id = req.params.addressId
    const customerAddress = (await CustomerAddress._readByPK(customer_id, address_id))[0]
    res.send({
        getAddress : customerAddress
    })
}

exports.postEditAddressByPK = async (req,res,next) => {
    const customerId = jwt.decode(req.headers.authorization).sub
    const addressId = req.params.addressId
    const houseNo = req.body.houseNo;
    const street = req.body.street;
    const subDistrict = req.body.subDistrict;
    const district = req.body.district;
    const province = req.body.province;
    const zipcode = req.body.zipcode;
    const customerAddress = new CustomerAddress( (await CustomerAddress._readByPK(customerId, addressId))[0][0] );
    customerAddress.setProperty = {
        customerId,
        addressId,
        houseNo,
        street,
        subDistrict,
        district,
        province,
        zipcode
    }
    const result = await customerAddress._update()
    res.send(result)
}

exports.deleteAddressByPK = async (req,res,next) => {
    const customer_id = jwt.decode(req.headers.authorization).sub
    const address_id = req.params.addressId
    const result = await CustomerAddress._delete(customer_id, address_id)
    res.send({
        deletedAddress : result
    })
}

