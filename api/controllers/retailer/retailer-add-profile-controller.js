const Retailer = require('../../models/policy-owner/retailer/retailer-model');

exports.postAddProfile = async (req, res, next) => {
    const retailer_id = req.params.retailerId;
    const name = req.body.name;
    const retailer_description = req.body.retailerDescription;
    const contact = req.body.contact;
    const hq_address = req.body.hqAddress;
    const root_id = req.body.rootId;
    const policy_owner_id = req.body.policyOwnerId;
    console.log(typeof(retailer_id))
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
