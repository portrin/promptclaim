const jwt = require('jsonwebtoken');

const ServiceCenterBranch = require('../../models/service-center/service-center-branch-model');

exports.getServiceCenterByUuid = async (req, res, next) => {
    const uuid = req.params.uuid;
    const serviceCenter = await ServiceCenterBranch._readByUuid(uuid);
    console.log(serviceCenter[0]);
    res.send(serviceCenter[0]);
};

exports.getServiceCenterByPolicyId = async (req, res, next) => {
    const policyId = req.params.policyId;
    const serviceCenter = await ServiceCenterBranch._readByPolicyId(policyId);
    console.log(serviceCenter[0]);
    res.send(serviceCenter[0]);
};