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
    const rootId = req.body.rootId;
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

exports.postAddProfile = async (req, res, next) => {
    const retailer_id = jwt.decode(req.headers.authorization).sub;
    const name = req.body.name;
    const retailer_description = req.body.retailerDescription;
    const contact = req.body.contact;
    const hq_address = req.body.hqAddress;
    const root_id = req.body.rootId;
    const policy_owner_id = await Retailer._getPolicyOwnerIdByRetailerId(retailerId)
    const retailer = new Retailer({
        retailer_id, 
        name, 
        retailer_description, 
        contact, 
        hq_address, 
        root_id, 
        policy_owner_id
    });
    const retailerProfile = await retailer._create();
    res.send({
        addRetailer: retailerProfile
    });
};

exports.deleteProfile = async (req, res, next) => {
    const retailerId = jwt.decode(req.headers.authorization).sub;
    const retailer = await Retailer._delete(retailerId);
    res.send({
        deleteRetailer: retailer
    });
};
