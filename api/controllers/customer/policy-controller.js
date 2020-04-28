const Policy = require('../../models/policy/policy-model');
const ProductHasPolicy = require('../../models/policy/product-has-policy-model');
const jwt = require('jsonwebtoken');

exports.getPolicy = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const policy = (await Policy._readByCustomerId(customerId))[0];
    console.log(policy);
    res.send(policy);
};

exports.getPolicyByUuid = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const uuid = req.params.uuid;
    const policy = (await Policy._readByUuid(customerId, uuid))[0];
    console.log(policy);
    res.send(policy);
};

exports.postAddProductHasPolicy = async (req, res, next) => {
    const policy_id = req.body.policyId;
    const uuid = req.params.uuid;
    const policy_start_date = req.body.policyStartDate;
    const policy_end_date = req.body.policyEndDate;
    const policy_timestamp = req.body.policyTimestamp;
    
    const productHasPolicy = new ProductHasPolicy({
        policy_id, uuid, policy_start_date, policy_end_date, policy_timestamp
    });

    const result = (await productHasPolicy._create())[0];
    console.log(result);
    res.send(result);
};
