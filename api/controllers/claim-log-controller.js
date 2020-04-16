const ClaimLog = require('../models/product/claim-log-model');
const jwt = require('jsonwebtoken');

exports.getCustomerClaimLog = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const result = await ClaimLog._readByCustomerId(customerId);
    res.send(result[0]);
}

exports.getProductClaimLogByUuid = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const uuidParams = req.params.uuid;
    const result = await ClaimLog._readByPurchasedProduct(uuidParams, customerId) ;
    res.send(result[0]);
}

exports.postAddClaimLog = async (req, res, next) => {
    const claim_id = req.body.claimId;
    const timestamp = req.body.timestamp;  
    const status = req.body.status;  
    const uuid = req.body.uuid;
    const service_center_id = req.body.serviceCenterId;
    const branch_id = req.body.branchId;    
    const claimLog = new ClaimLog({claim_id, timestamp, status, uuid, service_center_id, branch_id});
    const result = await claimLog._create(); 
    res.send(result[0]);  
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
    const result = await updatedClaimLog._update(claimIdParams);
    res.send(result[0]);
}

exports.deleteClaimLog = async (req, res, next) => {
    const claimIdParams = req.params.claimId;
    await ClaimLog._delete(claimIdParams);
    res.send('Claimlog Deleted!');
}