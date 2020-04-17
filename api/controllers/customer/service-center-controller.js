const jwt = require('jsonwebtoken');

const ServiceCenterBranch = require('../../models/service-center/service-center-branch-model');

exports.getServiceCenterByUuid = async (req, res, next) => {
    const uuid = req.params.uuid;
    const serviceCenter = (await ServiceCenterBranch._readByUuid(uuid))[0];
    console.log(serviceCenter);
    res.send(serviceCenter);
};

exports.getServiceCenterByPolicyId = async (req, res, next) => {
    const policyId = req.params.policyId;
    const serviceCenter = (await ServiceCenterBranch._readByPolicyId(policyId))[0];
    console.log(serviceCenter);
    res.send(serviceCenter);
};