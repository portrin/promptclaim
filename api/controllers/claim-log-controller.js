const ClaimLog = require('../models/product/claim-log-model');
const jwt = require('jsonwebtoken');

exports.getCustomerClaimLog = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const result = await ClaimLog._readByCustomerId(customerId) [0];
    res.send(result);
}

exports.getProductClaimLog = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const result = await ClaimLog._readByPurchasedProduct(uuid, customerId) [0];
    res.send(result);
}

exports.postAddClaimLog = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const claimId = body.req.claim_id;
    const timestamp = body.req.timestamp;
    const status = body.req.status;
    const claimLog = new ClaimLog(claimId, timestamp, status);
    const result = await claimLog._create() [0];
    res.send(result);    
}

exports.postEditClaimLog = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const claimId = body.req.claim_id;
    const timestamp = body.req.timestamp;
    const status = body.req.status;
    const claimLog = new ClaimLog(claimId, timestamp, status);
    const claimIdParams = req.params.claim_id;
    const result = await claimLog._update(claimIdParams, customerId)[0];
    res.send(result);
}

exports.deleteClaimLog = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const claimId = req.params.claim_id;
    ClaimLog._delete(claimId, customerId);
    res.send('Claimlog Deleted!');
}