const Retailer = require('../../models/policy-owner/retailer/retailer-model');
const jwt = require('jsonwebtoken')

exports.getProfile = async (req, res, next) => {
    const retailerId = jwt.decode(req.headers.authorization).sub;
    const retailerProfile = (await Retailer._readByRetailerId(retailerId))[0];
    res.send({
        getProfile: retailerProfile
    })
};

exports.postEditProfile = async (req, res, next) => {
    const retailerId = jwt.decode(req.headers.authorization).sub;
    const name = req.body.name;
    const retailerDescription = req.body.retailerDescription;
    const contact = req.body.contact;
    const hqAddress = req.body.hqAddress;
    const rootId = jwt.decode(req.headers.authorization).root;
    const policyOwnerId = await Retailer._getPolicyOwnerIdByRetailerId(retailerId)
    const retailer = new Retailer((await Retailer._readByRetailerId(retailerId))[0][0])
    retailer.setProperty = {
        retailerId, 
        name, 
        retailerDescription, 
        contact, 
        hqAddress, 
        rootId, 
        policyOwnerId
    }
    const retailerProfile = await retailer._update();
    res.send({
        editProfile: retailerProfile
    });
};

exports.deleteProfile = async (req, res, next) => {
    const retailerId = jwt.decode(req.headers.authorization).sub;
    const retailer = await Retailer._delete(retailerId);
    res.send({
        deleteRetailer: retailer
    });
};
