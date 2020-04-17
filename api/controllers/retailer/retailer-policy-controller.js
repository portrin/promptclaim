const Policy = require('../../models/policy/policy-model');

exports.getPolicy = async (req, res, next) => {
    //const retailerId = ...
    const policy = (await Policy._readByRetailerId(retailerId))[0];
    console.log(policy);
    res.send(policy);
};