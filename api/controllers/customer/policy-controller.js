const Policy = require('../../models/policy/policy-model');
const jwt = require('jsonwebtoken');

exports.getPolicy = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const policy = await Policy._readByCustomerId(customerId)[0];
    console.log(policy);
    res.send(policy);
};

exports.getPolicyByUuid = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const uuid = req.params.uuid;
    const policy = await Policy._readByUuid(customerId, uuid)[0];
    console.log(policy);
    res.send(policy);
};
