const Policy = require('../models/policy/policy-model');
const jwt = require('jsonwebtoken');

exports.getPolicy = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
};

exports.getPolicyByUuid = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
};
