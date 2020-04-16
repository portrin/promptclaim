const PurchasedProduct = require('../../models/product/product-model');
const jwt = require('jsonwebtoken');

//get all products
exports.getCustomerProducts = async (req, res ,next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const result = await PurchasedProduct._readByCustomerId(customerId) [0];
    res.send(result);   
};


//get product by productNo
exports.getProductByProductNo = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const productNo = req.params.productNo;
    const result = await PurchasedProduct._readByProductNo(productNo, customerId) [0];
    res.send(result);   
};

//get product by uuid
exports.getProductByUuid = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const uuid = req.params.uuid;
    const result = await PurchasedProduct._readByUuid(uuid, customerId) [0];
    res.send(result);
}


//add a product
exports.postAddProduct = async (req, res, next) => {
    const serialNo = req.body.serial_no;
    const productNo = req.body.product_no;
    const customerId = jwt.decode(req.headers.authorization).sub;
    const productNickname = req.body.product_nickname;
    const price = req.body.price;
    const invoiceID = req.body.invoice_id;
    const timestamp = req.body.timestamp;
    const branchID = req.body.branch_id;
    const retailerID = req.body.retailer_id;
    const receiptPhoto = req.body.receipt_photo;
    const isValidate = req.body.is_validate;
    const productPhoto = req.body.product_photo;
    const claimQty = req.body.claim_qty;
    const warrantyPhoto = req.body.warranty_photo;
    const product = new PurchasedProduct(
                            serialNo,
                            productNo,
                            customerId,
                            productNickname, 
                            price, 
                            invoiceID, 
                            timestamp, 
                            branchID, 
                            retailerID, 
                            receiptPhoto, 
                            isValidate, 
                            productPhoto, 
                            claimQty,
                            warrantyPhoto
                            );               
    const result = await product._create();
    res.send(result);  

};


//delete a product
exports.deleteProductByUuid = async (req, res, next) => {
    const uuid = req.params.uuid;
    await PurchasedProduct._deleteByKey(uuid);
    res.send('Product Deleted!')
};


//edit a product
exports.postEditProductByUuid = async (req, res, next) => {
    const uuid = req.params.uuid;
    const serialNo = req.body.serial_no;
    const productNo = req.body.product_no;
    const customerId = jwt.decode(req.headers.authorization).sub;
    const productNickname = req.body.product_nickname;
    const price = req.body.price;
    const invoiceID = req.body.invoice_id;
    const timestamp = req.body.timestamp;
    const branchID = req.body.branch_id;
    const retailerID = req.body.retailer_id;
    const receiptPhoto = req.body.receipt_photo;
    const isValidate = req.body.is_validate;
    const productPhoto = req.body.product_photo;
    const claimQty = req.body.claim_qty;
    const warrantyPhoto = req.body.warranty_photo;
    const updatedProduct = new PurchasedProduct(
                            uuid,
                            serialNo,
                            productNo,
                            customerId, 
                            productNickname,
                            price, 
                            invoiceID, 
                            timestamp, 
                            branchID, 
                            retailerID, 
                            receiptPhoto, 
                            isValidate, 
                            productPhoto, 
                            claimQty,
                            warrantyPhoto
                            );    
    await updatedProduct._update(uuid);
    res.send('Product ' + updatedProduct.uuid + ' is updated!')
    
};
                        





 

