const ClaimLog = require('../models/product/claim-log-model');
const jwt = require('jsonwebtoken');

exports.getCustomerClaimLog = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const result = await ClaimLog._readByCustomerId(customerId) [0];
    res.send(result);
}

exports.getProductClaimLogByUuid = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const uuidParams = req.params.uuid;
    const result = await ClaimLog._readByPurchasedProduct(uuidParams, customerId) [0];
    res.send(result);
}

exports.postAddClaimLog = async (req, res, next) => {
    const claimId = body.req.claim_id;
    const timestamp = body.req.timestamp;
    const status = body.req.status;
    const uuid = body.req.uuid;
    const serviceCenterId = body.req.service_center_id;
    const branchId = body.req.branch_id;
    const claimLog = new ClaimLog(claimId, timestamp, status, uuid, serviceCenterId, branchId);
    const result = await claimLog._create() [0];
    res.send(result);    
}

exports.postEditClaimLog = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const claimId = body.req.claim_id;
    const timestamp = body.req.timestamp;
    const status = body.req.status;
    const uuid = body.req.uuid;
    const serviceCenterId = body.req.service_center_id;
    const branchId = body.req.branch_id;
    const updatedClaimLog = new ClaimLog(claimId, timestamp, status, uuid, serviceCenterId, branchId);
    const claimIdParams = req.params.claimId;
    const result = await updatedClaimLog._update(claimIdParams, customerId)[0];
    res.send(result);
}

exports.deleteClaimLog = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const claimIdParams = req.params.claimId;
    ClaimLog._delete(claimIdParams, customerId);
    res.send('Claimlog Deleted!');
}