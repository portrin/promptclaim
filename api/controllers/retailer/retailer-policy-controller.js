const Policy = require('../../models/policy/policy-model');
const jwt = require('jsonwebtoken')

exports.getPolicy = async (req, res, next) => {
    const retailerId = jwt.decode(req.headers.authorization).sub;
    const policy = (await Policy._readByRetailerId(retailerId))[0];
    console.log(policy);
    res.send(policy);
};

exports.getPolicyByPolicyId = async (req, res, next) => {
    const retailerId = jwt.decode(req.headers.authorization).sub;
    const policyId = req.params.policyId;
    const policy = (await Policy._readByPolicyId(retailerId, policyId))[0];
    console.log(policy);
    res.send(policy);
}