const ClaimLog = require('../models/product/claim-log-model');
const jwt = require('jsonwebtoken');

exports.getCustomerClaimLog = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const result = (await ClaimLog._readByCustomerId(customerId)) [0];
    res.send(result);
}

exports.getProductClaimLogByUuid = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const uuidParams = req.params.uuid;
    const result = (await ClaimLog._readByPurchasedProduct(uuidParams, customerId)) [0] ;
    res.send(result);
}

exports.postAddClaimLog = async (req, res, next) => {
    const claim_id = req.body.claimId;
    const timestamp = req.body.timestamp;  
    const status = req.body.status;  
    const uuid = req.body.uuid;
    const service_center_id = req.body.serviceCenterId;
    const branch_id = req.body.branchId;    
    const claimLog = new ClaimLog({claim_id, timestamp, status, uuid, service_center_id, branch_id});
    const result = (await claimLog._create()) [0]; 
    res.send(result);  
}

exports.postEditClaimLog = async (req, res, next) => {
    const claim_id = req.body.claim_id;
    const timestamp = req.body.timestamp;
    const status = req.body.status;
    const uuid = req.body.uuid;
    const service_center_id = req.body.serviceCenterId;
    const branch_id = req.body.branchId;
    const updatedClaimLog = new ClaimLog({claim_id, timestamp, status, uuid, service_center_id, branch_id});
    const claimIdParams = req.params.claimId;
    const result = (await updatedClaimLog._update(claimIdParams)) [0];
    res.send(result);
}

exports.deleteClaimLog = async (req, res, next) => {
    const claimIdParams = req.params.claimId;
    await ClaimLog._delete(claimIdParams);
    res.send('Claimlog Deleted!');
}