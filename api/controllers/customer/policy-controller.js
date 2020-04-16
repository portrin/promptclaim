const Policy = require('../../models/policy/policy-model');
const jwt = require('jsonwebtoken');

exports.getPolicy = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const policy = await Policy._readByCustomerId(customerId);
    console.log(policy[0]);
    res.send(policy[0]);
};

exports.getPolicyByUuid = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const uuid = req.params.uuid;
    const policy = await Policy._readByUuid(customerId, uuid);
    console.log(policy[0]);
    res.send(policy[0]);
};
